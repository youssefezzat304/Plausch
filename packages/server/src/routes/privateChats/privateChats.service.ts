import { InternalServerError, NotFoundError } from "@/utils/exception";
import { PrivateChatModel } from "./privateChats.model";

class ChatsService {
  public async getChat(chatId: string) {
    try {
      const chat = await PrivateChatModel.findById(chatId)
        .populate({
          path: "lastMessage",
          model: "MessageDocument",
          select: "content sender",
        })
        .populate({
          path: "participants",
          model: "UserDocument",
          select: "displayName profilePicture onlineStatus",
        })
        .lean();

      if (!chat) {
        throw new NotFoundError("Chat not found");
      }
      return chat;
    } catch (error) {
      throw new InternalServerError("Failed to get chat");
    }
  }
}

export default ChatsService;
