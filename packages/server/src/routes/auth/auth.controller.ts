import { NextFunction, Router, Request, Response } from "express";
import AuthService from "./auth.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";

const authController: Router = Router();
const authService = new AuthService();

const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const body = req.body;
  try {
    const { user, tokens } = await authService.checkForCredentials(body);

    if (user) res.locals.user = user;

    authService.setAuthCookies(res, tokens);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const body = req.body;
  try {
    const { user, tokens } = await authService.register(body);

    if (user) res.locals.user = user;

    authService.setAuthCookies(res, tokens);

    return res.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};

const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await authService.refreshTokens(refreshToken);

    authService.setAuthCookies(res, tokens);

    return res.status(200).json({ message: "Token refreshed successfully." });
  } catch (error) {
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
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out successfully." });
};

// TODO: forget password endpoint
// TODO: reset password endpoint

authController.post("/auth/register", register);
authController.post("/auth/login", logIn);
authController.post("/auth/refresh", authenticateUser, refreshAccessToken);
authController.get("/auth/me", authenticateUser, getCurrentUser);
authController.get("/auth/logout", authenticateUser, logOut);

export default authController;
