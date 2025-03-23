import { config } from "dotenv";
import express, { Application, Router } from "express";
import http from "http";
// import { Server, Socket } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import { errorHandler } from "../middlewares/errorHandler.middleware";
// import { SocketHandler } from "../types/interface";
// import messageSocketHandler from "../routes/message/message.socket";
import path from "path";
import { errorHandler } from "./middleswares/errorHandler.middleware";
import { Server, Socket } from "socket.io";
import initializeSockets from "./utils/sockets";

config();

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
};

const app: Application = express();
const port = 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const initialiseMiddleware = (): void => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev"));
  app.use(
    "/avatars",
    express.static(path.join(__dirname, "../assets/avatars")),
  );
};

const initialiseDatabaseConnection = (): void => {
  const dbConnection = process.env.DATABASE_CONNECTION;
  if (!dbConnection) {
    throw new Error("DATABASE_CONNECTION environment variable is not set");
  }
  mongoose
    .connect(dbConnection)
    .then(() => console.log("Database is ONLINE"))
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1);
    });
};

const initializeSocketConnection = (io: Server): void => {
  initializeSockets(io);
};

const initialiseControllers = (controllers: Router[]): void => {
  controllers.forEach((controller: Router) => {
    app.use("/api", controller);
  });
};

const initialiseErrorHandler = (): void => {
  app.use(errorHandler);
};

const listen = (): void => {
  server.listen(port, () => {
    console.log(`Server is ONLINE on port: ${port}`);
  });
};

const initializeApp = (controllers: Router[]): void => {
  initialiseMiddleware();
  initialiseDatabaseConnection();
  initialiseControllers(controllers);
  initializeSocketConnection(io);
  initialiseErrorHandler();
};

export {
  app,
  server,
  // io,
  initialiseMiddleware,
  initialiseDatabaseConnection,
  initializeSocketConnection,
  initialiseControllers,
  initialiseErrorHandler,
  listen,
  initializeApp,
};
