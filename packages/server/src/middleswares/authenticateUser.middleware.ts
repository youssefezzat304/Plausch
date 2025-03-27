import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "@/utils/jwt";
import { AuthError } from "@/utils/exception";
import { ErrorMessage } from "@shared/exceptions";
import AuthService from "@/routes/auth/auth.service";
import { UserDocument } from "@/routes/users/users.model";

const authService = new AuthService();

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { accessToken } = req.cookies;

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
