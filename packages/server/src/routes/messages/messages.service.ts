import { BadRequestError, InternalServerError } from "@/utils/exception";
import { Content, MessageModel } from "./messages.model";
import { ErrorMessage } from "@shared/exceptions";
import { PrivateChatModel } from "../privateChats/privateChats.model";
import mongoose from "mongoose";
import { UserModel } from "../users/users.model";

export default class MessagesService {
  public async sendMessage(
    senderId: string,
    content: Content,
    conversationId: string,
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (!content.type || (content.type === "text" && !content.text)) {
        throw new BadRequestError("Invalid message content");
      }

      const [message] = await MessageModel.create(
        [
          {
            sender: new mongoose.Types.ObjectId(senderId),
            conversationId: conversationId,
            content,
            status: {
              sent: true,
              deliveredTo: [],
              readBy: [],
            },
          },
        ],
        { session },
      );

      await PrivateChatModel.findByIdAndUpdate(
        conversationId,
        {
          lastMessage: message._id,
          lastActive: new Date(),
        },
        { session },
      );

      await session.commitTransaction();

      const populatedMessage = await MessageModel.populate(message, {
        path: "sender",
        select: "displayName profilePicture",
        model: UserModel,
      });

      return populatedMessage;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async getMessages(conversationId: string | null) {
    try {
      const messages = await MessageModel.find({
        conversationId: conversationId,
      })
        .sort({ createdAt: 1 })
        .populate({
          path: "sender",
          model: "UserDocument",
          select: "username profilePicture",
        });

      return messages;
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}
