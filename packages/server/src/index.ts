import "tsconfig-paths/register";
import "dotenv/config";
import "express-async-error";
import { initializeApp, listen } from "./app";
import authController from "./routes/auth/auth.controller";
import userController from "./routes/users/users.controller";
import messagesController from "./routes/messages/messages.controller";
import chatsController from "./routes/chats/chats.controller";
import friendsController from "./routes/friends/friends.controller";

const controllers = [
  authController,
  userController,
  messagesController,
  chatsController,
  friendsController,
];

initializeApp(controllers);

listen();
