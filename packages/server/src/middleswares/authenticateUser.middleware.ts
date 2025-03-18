import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "@/utils/jwt";
import { AuthError } from "@/utils/exception";
import { ErrorMessage } from "@shared/exceptions/exceptions";
import { UserDocument } from "@/routes/users/users.model";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const accessToken = req.cookies["accessToken"];

    if (!accessToken) throw new AuthError(ErrorMessage.ACC_TOKEN);

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
    throw new AuthError(ErrorMessage.GENERIC_ERROR);
  }
};

export default authenticateUser;
