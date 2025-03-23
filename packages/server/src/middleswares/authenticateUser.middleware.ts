import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "@/utils/jwt";
import { AuthError } from "@/utils/exception";
import { ErrorMessage } from "@shared/exceptions/exceptions";
import { UserDocument } from "@/routes/users/users.model";
import AuthService from "@/routes/auth/auth.service";

const authService = new AuthService();

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
      if (!refreshToken) {
        throw new AuthError(ErrorMessage.ACC_TOKEN);
      }

      try {
        const tokens = await authService.refreshTokens(refreshToken);

        authService.setAuthCookies(res, tokens);

        return res.status(200).json({ success: true });
      } catch (refreshError) {
        throw new AuthError(ErrorMessage.ACC_TOKEN);
      }
    }

    const decoded = verifyJwt<UserDocument>(
      accessToken,
      "accessTokenPublicKey",
    );

    if (!decoded) {
      throw new AuthError(ErrorMessage.ACC_TOKEN);
    }

    res.locals.user = decoded;

    return next();
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
