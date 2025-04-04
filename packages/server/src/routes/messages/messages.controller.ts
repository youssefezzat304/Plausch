import { Request, Response, NextFunction, Router } from "express";
import MessagesService from "./messages.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";

const messagesController: Router = Router();
const messagesService = new MessagesService();

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversationId = req.params.conversationId;

    const messages = await messagesService.getMessages(conversationId);

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

messagesController.get(
  "/message/:conversationId",
  authenticateUser,
  getMessages,
);

export default messagesController;
