import { UserInputType, userSchema } from "@shared/schemas/user.schema";
import { Types } from "mongoose";
import { UserModel } from "./users.model";
import {
  AuthError,
  BaseError,
  InternalServerError,
  NotFoundError,
} from "@/utils/exception";
import { ErrorMessage } from "@shared/index";

class UserService {
  public async updateUserInfo(
    userId: Types.ObjectId | string,
    data: UserInputType,
  ) {
    try {
      userSchema.parse(data);

      const currentUser = await UserModel.findById(userId);
      if (!currentUser) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);

      if (data.email && data.email !== currentUser.email) {
        const existingUser = await UserModel.findOne({
          email: data.email,
          _id: { $ne: userId },
        });
        if (existingUser) throw new AuthError(ErrorMessage.EMAIL_USED);
      }

      const hasChanges = (Object.keys(data) as (keyof UserInputType)[]).some(
        (key) => {
          return (currentUser as any)[key] != data[key];
        },
      );

      if (!hasChanges) {
        return { message: "No changes detected.", user: currentUser };
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true },
      );

      if (!updatedUser) throw new NotFoundError(ErrorMessage.GENERIC_ERROR);

      return updatedUser;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalServerError(ErrorMessage.GENERIC_ERROR);
    }
  }
}

export default UserService;
