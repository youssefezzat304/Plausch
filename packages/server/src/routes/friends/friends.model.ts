import { prop, getModelForClass, Ref, index } from "@typegoose/typegoose";
import { UserDocument } from "../users/users.model";
import { Types } from "mongoose";

@index({ sender: 1, recipient: 1 })
@index({ status: 1 })
export class FriendRequestDocument {
  @prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ required: true, ref: () => "UserDocument" })
  public sender!: Ref<UserDocument>;

  @prop({ required: true, ref: () => "UserDocument" })
  public recipient!: Ref<UserDocument>;

  @prop({ default: "pending", enum: ["pending", "accepted", "rejected"] })
  public status!: "pending" | "accepted" | "rejected";

  @prop({ default: Date.now })
  public createdAt!: Date;

  @prop({ default: null })
  public updatedAt?: Date;
}

export const FriendRequestModel = getModelForClass(FriendRequestDocument);
