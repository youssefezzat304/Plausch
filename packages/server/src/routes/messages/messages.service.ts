import { BadRequestError, InternalServerError } from "@/utils/exception";
import { Content, MessageModel } from "./messages.model";
import { ErrorMessage } from "@shared/exceptions";
import ChatsService from "../chats/chats.service";
import { ChatModel } from "../chats/chats.model";
import mongoose from "mongoose";
import { UserModel } from "../users/users.model";

const chatService: ChatsService = new ChatsService();

export default class MessagesService {
  public async sendMessage(
    senderId: string,
    conversationId: string,
    content: Content,
    recipientId: string,
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (!content.type || (content.type === "text" && !content.text)) {
        throw new BadRequestError("Invalid message content");
      }
      // TODO: set Chat to const
      let chatExists = true;
      await ChatModel.findById(conversationId)
        .session(session)
        .catch(() => {
          chatExists = false;
        });

      if (!chatExists) {
        if (!recipientId) throw new BadRequestError("Recipient required");

        const newChat = await chatService.createChat(
          [senderId, recipientId],
          session,
        );

        conversationId = newChat._id.toString();
      }

      const [message] = await MessageModel.create(
        [
          {
            sender: senderId,
            conversationId,
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

      await ChatModel.findOneAndUpdate(
        { conversationId: conversationId },
        { lastMessage: message._id, lastActive: new Date() },
        { session },
      );

      console.log("Message sent", message);

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

  public async getMessages(conversationId: string) {
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
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}
