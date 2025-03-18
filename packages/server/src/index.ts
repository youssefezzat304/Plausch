import "tsconfig-paths/register";
import "dotenv/config";
import "express-async-error";
import { initializeApp, listen } from "./app";
import authController from "./routes/auth/auth.controller";

const controllers = [authController];

initializeApp(controllers);

listen();
