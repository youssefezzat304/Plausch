import { Request, Response, NextFunction, Router } from "express";
import ChatsService from "./privateChats.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";

const privateChatsController: Router = Router();
const privateChatsService = new ChatsService();

const getChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;

    const chat = await privateChatsService.getChat(chatId);

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

privateChatsController.get("/privateChat/:chatId", authenticateUser, getChat);

export default privateChatsController;
