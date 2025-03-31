import { DocumentType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import {
  AuthError,
  BadRequestError,
  BaseError,
  InternalServerError,
  NotFoundError,
} from "@/utils/exception";
import { ZodError } from "zod";
import { ErrorMessage } from "@shared/exceptions";
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

      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) throw new NotFoundError(ErrorMessage.WRONG_CRED);

      const isValid = await user.validatePassword(password);
      if (!isValid) throw new AuthError(ErrorMessage.WRONG_CRED);

      return user;
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

      return user;
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

  // async logout(userId: string) {
  //   await UserModel.findByIdAndUpdate(userId, {
  //     onlineStatus: false,
  //     lastSeen: new Date(),
  //   });
  // }
}

export default AuthService;
