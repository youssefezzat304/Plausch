import {
  BadRequestError,
  BaseError,
  InternalServerError,
} from "@/utils/exception";
import { ChatModel } from "./chats.model";
import { ClientSession, Types } from "mongoose";
import { createChatSchema } from "@shared/schemas/chat.schema";
import { ZodError } from "zod";
import { UserModel } from "../users/users.model";

class ChatsService {
  public async createChat(participantIds: string[], session?: ClientSession) {
    const shouldStartSession = !session;
    const currentSession = session || (await ChatModel.startSession());

    try {
      if (shouldStartSession) currentSession.startTransaction();
      const {
        participantIds: [userId1, userId2],
      } = createChatSchema.parse({
        participantIds,
      });

      const sortedParticipants = [
        new Types.ObjectId(userId1),
        new Types.ObjectId(userId2),
      ].sort((a, b) => a.toString().localeCompare(b.toString()));

      const existingChat = await ChatModel.findOne({
        participants: {
          $all: sortedParticipants,
          $size: 2,
        },
      }).session(currentSession);

      if (existingChat) {
        await currentSession.abortTransaction();
        return existingChat;
      }

      const newChat = await ChatModel.create(
        [
          {
            participants: sortedParticipants,
            conversationId: new Types.ObjectId(),
            lastActive: new Date(),
          },
        ],
        { currentSession },
      );

      await Promise.all([
        UserModel.updateOne(
          { _id: userId1 },
          { $push: { chats: newChat[0]._id } },
          { session: currentSession },
        ),
        UserModel.updateOne(
          { _id: userId2 },
          { $push: { chats: newChat[0]._id } },
          { session: currentSession },
        ),
      ]);

      await currentSession.commitTransaction();
      return newChat[0];
    } catch (error) {
      await currentSession.abortTransaction();

      if (error instanceof ZodError) {
        throw new BadRequestError(error.issues[0].message);
      }

      if (error instanceof Error && "code" in error && error.code === 11000) {
        throw new InternalServerError(
          "Chat already exists between these users",
        );
      }

      throw error instanceof BaseError
        ? error
        : new InternalServerError("Failed to create chat");
    } finally {
      currentSession.endSession();
    }
  }
}

export default ChatsService;
