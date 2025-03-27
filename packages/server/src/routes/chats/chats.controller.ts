import { Request, Response, NextFunction, Router } from "express";
import ChatsService from "./chats.service";

const chatsController: Router = Router();
const chatsService = new ChatsService();

const createChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { participants } = req.body;
    const chat = await chatsService.createChat(participants);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};

chatsController.post("/chats/private", createChat);

export default chatsController;
