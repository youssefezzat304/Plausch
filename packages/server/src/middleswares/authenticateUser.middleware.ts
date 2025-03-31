import { NextFunction, Request, Response } from "express";
import { AuthError } from "@/utils/exception";
import { UserModel } from "@/routes/users/users.model";
import { getToken } from "next-auth/jwt";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?._id) {
      throw new AuthError("Invalid token");
    }

    const user = await UserModel.findById(token._id);
    if (!user) {
      throw new AuthError("User not found");
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    if (error instanceof AuthError) {
      return next(error);
    }
    throw new AuthError("Authentication failed");
  }
};

export default authenticateUser;
