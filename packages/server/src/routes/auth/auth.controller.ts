import { NextFunction, Router, Request, Response } from "express";
import AuthService from "./auth.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";
import { signupInputType } from "@shared/schemas/auth.schema";
import UserService from "../users/users.service";

const authController: Router = Router();
const authService = new AuthService();
const userService = new UserService();

const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const body = req.body;

  try {
    const user = await authService.checkForCredentials(body);

    if (user) res.locals.user = user;

    await userService.setOnlineStatus(user._id, true);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (
  req: Request<{}, {}, signupInputType>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const body = req.body;
  try {
    const user = await authService.register(body);

    if (user) res.locals.user = user;

    await userService.setOnlineStatus(user._id, true);

    return res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const userId = res.locals.user._id;

    const user = await authService.getUser(userId);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const logOut = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  return res.status(200).json({ message: "Logged out successfully." });
};

// TODO: forget password endpoint
// TODO: reset password endpoint

authController.post("/auth/register", register);
authController.post("/auth/login", logIn);
authController.get("/auth/me", getCurrentUser);
authController.get("/auth/logout", logOut);

export default authController;
