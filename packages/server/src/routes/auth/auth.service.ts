// Third-Party Packages
import { Response } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { Types } from "mongoose";
// Utilities & Helpers
import { signJwt, verifyJwt } from "@/utils/jwt";
import { chooseRandomAvatar } from "@/utils/logic";
import { constants } from "@/config/constants";
// Error Handling
import {
  AuthError,
  BadRequestError,
  BaseError,
  InternalServerError,
  NotFoundError,
} from "@/utils/exception";
import { ZodError } from "zod";
import { ErrorMessage } from "@shared/exceptions/exceptions";
import {
  loginInputType,
  loginSchema,
  signupInputType,
  signupSchema,
} from "@shared/schemas/auth.schema";
import { UserDocument, UserModel } from "@/routes/users/users.model";

class AuthService {
  public async checkForCredentials(input: loginInputType) {
    try {
      const { email, password } = loginSchema.parse(input);

      const user = await UserModel.findOne({ email });
      if (!user) throw new NotFoundError(ErrorMessage.WRONG_CRED);

      const isValid = await user.validatePassword(password);
      if (!isValid) throw new AuthError(ErrorMessage.WRONG_CRED);

      const tokens = this.generateTokens(user);

      return { user, tokens };
    } catch (error) {
      if (error instanceof BaseError) {
        throw error;
      }
      if (error instanceof ZodError) {
        throw new BadRequestError(error.errors[0].message);
      }
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async register(input: signupInputType) {
    try {
      const { email } = signupSchema.parse(input);

      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        throw new AuthError(ErrorMessage.EMAIL_USED);
      }

      const user = (await UserModel.create(
        input,
      )) as DocumentType<UserDocument>;
      // user.profilePicture = chooseRandomAvatar();

      const tokens = this.generateTokens(user);

      if (!tokens) {
        throw new AuthError("Failed to create user.");
      }

      return { user, tokens };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      if (error instanceof ZodError) {
        throw new BadRequestError(error.errors[0].message);
      }
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async getUser(userId: Types.ObjectId | string) {
    try {
      const user = (await UserModel.findById(
        userId,
      )) as DocumentType<UserDocument> | null;

      if (!user) {
        throw new NotFoundError("User not found.");
      }

      return user;
    } catch (error) {
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async refreshTokens(refreshToken: string) {
    try {
      if (typeof refreshToken !== "string" || !refreshToken.trim()) {
        throw new AuthError("Invalid or missing refresh token.");
      }

      const tokenParts = refreshToken.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new AuthError("Malformed refresh token.");
      }

      const token = tokenParts[1];

      const decoded = verifyJwt<UserDocument>(token, "refreshTokenPublicKey");
      if (!decoded) throw new AuthError("Invalid refresh token.");

      const user = (await UserModel.findById(
        decoded._id,
      )) as DocumentType<UserDocument>;

      if (!user) throw new NotFoundError("User not found.");

      const tokens = this.generateTokens(user);

      return tokens;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public setAuthCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: constants.REFRESH_TOKEN_TIMEOUT,
    });

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: constants.ACCESS_TOKEN_TIMEOUT,
    });
  }

  private generateTokens(user: UserDocument) {
    const accessToken = signJwt({ userId: user._id }, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    const refreshToken = signJwt(
      { userId: user._id },
      "refreshTokenPrivateKey",
      { expiresIn: "1y" },
    );

    return { accessToken, refreshToken };
  }
}

export default AuthService;
