import "tsconfig-paths/register";
import "dotenv/config";
import "express-async-error";
import { initializeApp, listen } from "./app";
import authController from "./routes/auth/auth.controller";
import userController from "./routes/users/users.controller";
import messagesController from "./routes/messages/messages.controller";
import privateChatsController from "./routes/privateChats/privateChats.controller";
import friendsController from "./routes/friends/friends.controller";

const controllers = [
  authController,
  userController,
  messagesController,
  privateChatsController,
  friendsController,
];

initializeApp(controllers);

listen();
