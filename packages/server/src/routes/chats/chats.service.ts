import { InternalServerError } from "@/utils/exception";
import { ChatModel } from "./chats.model";
import { ErrorMessage } from "@shared/index";

export class ChatsService {
  public async createChat(participants: string[]) {
    try {
      const chat = await ChatModel.create({ participants });
      return chat;
    } catch (error) {
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}
