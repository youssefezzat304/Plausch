import { UserInputType, userSchema } from "@shared/schemas/user.schema";
import mongoose, { Types } from "mongoose";
import {
  AuthError,
  BaseError,
  InternalServerError,
  NotFoundError,
} from "@/utils/exception";
import { ErrorMessage } from "@shared/exceptions";
import { UserDocument, UserModel } from "./users.model";
import { DocumentType } from "@typegoose/typegoose";

class UserService {
  public async updateUserInfo(
    userId: Types.ObjectId | string,
    data: UserInputType,
  ) {
    try {
      userSchema.parse(data);

      const currentUser = (await UserModel.findById(
        userId,
      ).lean()) as DocumentType<UserDocument>;

      if (!currentUser) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);

      if (data.email && data.email !== currentUser.email) {
        const existingUser = await UserModel.findOne({
          email: data.email,
          _id: { $ne: userId },
        }).lean();

        if (existingUser) throw new AuthError(ErrorMessage.EMAIL_USED);
      }

      const hasChanges = (Object.keys(data) as (keyof UserInputType)[]).some(
        (key) => {
          return JSON.stringify(currentUser[key]) !== JSON.stringify(data[key]);
        },
      );

      if (!hasChanges) {
        throw new InternalServerError("No changes detected.");
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true },
      ).lean();

      if (!updatedUser) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);

      return updatedUser;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async setOnlineStatus(
    userId: Types.ObjectId | string,
    status: boolean,
  ) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { onlineStatus: status },
        { new: true },
      );

      if (!user) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);

      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }

  public async getUser(userId: Types.ObjectId | string) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);
      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}

export default UserService;
