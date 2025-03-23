import { Request, Response, NextFunction, Router } from "express";
import MessagesService from "./messages.service";

const messagesController: Router = Router();
const messagesService = new MessagesService();

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;

    const message = await messagesService.sendMessage(
      senderId,
      chatId,
      content,
    );

    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatId = req.params.chatId;
    const messages = await messagesService.getMessages(chatId);
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

messagesController.post("/:chatId", sendMessage);
messagesController.get("/:chatId", getMessages);

export default messagesController;
