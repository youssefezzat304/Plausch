import { InternalServerError } from "@/utils/exception";
import { Content, MessageModel } from "./messages.model";
import { ErrorMessage } from "@shared/index";
import { UserModel } from "../users/users.model";

export default class MessagesService {
  public async sendMessage(
    senderId: string,
    conversationId: string,
    content: Content,
  ) {
    try {
      if (!content.type || (content.type === "text" && !content.text)) {
        throw new Error("Invalid message content");
      }

      const message = await MessageModel.create({
        senderId,
        conversationId,
        content,
        status: {
          sent: true,
          deliveredTo: [],
          readBy: [],
        },
      });

      const populatedMessage = await MessageModel.populate(message, {
        path: "senderId",
        select: "displayName profilePicture",
        model: UserModel,
      });

      return populatedMessage;
    } catch (error) {
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async getMessages(chatId: string) {
    /**
     * Fetch all messages for a specific chatId.
     * @param chatId - The ID of the chat/conversation.
     * @returns Array of messages with sender details populated.
     */
    try {
      const messages = await MessageModel.find({ conversationId: chatId })
        .sort({ createdAt: 1 })
        .populate({
          path: "senderId",
          select: "username profilePicture",
          model: "User",
        });

      return messages;
    } catch (error) {
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}
