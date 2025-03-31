import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
  index,
} from "@typegoose/typegoose";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { PrivateChatDocument } from "../privateChats/privateChats.model";

@pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})
@index(
  { email: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
    partialFilterExpression: { email: { $exists: true } },
  },
)
@index({ displayName: "text" })
@index({ friends: 1 })
@index({ sentRequests: 1 })
@index({ friendRequests: 1 })
@index({ contacts: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class UserDocument {
  @prop({
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  public _id!: Types.ObjectId;

  @prop({
    required: true,
    minlength: 3,
    maxlength: 32,
  })
  public displayName!: string;

  @prop({
    required: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
  })
  public email!: string;

  @prop({
    required: true,
    minlength: 6,
    maxlength: 64,
    select: false,
  })
  password!: string;

  @prop({
    default: "https://github.com/shadcn.png",
    match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL"],
  })
  public profilePicture!: string;

  @prop({
    ref: "PrivateChatDocument",
    default: [],
    validate: {
      validator: (privateChats: Types.ObjectId[]) =>
        privateChats.length <= 1000,
      message: "Maximum 1000 privateChats allowed",
    },
  })
  public privateChats!: Ref<PrivateChatDocument>[];

  @prop({
    ref: "UserDocument",
    default: [],
    validate: {
      validator: (sentRequests: Types.ObjectId[]) => sentRequests.length <= 500,
      message: "Maximum 500 pending sent requests allowed",
    },
  })
  public sentRequests!: Ref<UserDocument>[];

  @prop({
    ref: "UserDocument",
    default: [],
    validate: {
      validator: (friendRequests: Types.ObjectId[]) =>
        friendRequests.length <= 500,
      message: "Maximum 500 pending received requests allowed",
    },
  })
  public friendRequests!: Ref<UserDocument>[];

  @prop({
    ref: "UserDocument",
    default: [],
    validate: {
      validator: (contacts: Types.ObjectId[]) => contacts.length <= 2000,
      message: "Maximum 2000 contacts allowed",
    },
  })
  public contacts!: Ref<UserDocument>[];

  @prop({
    match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
    default: "",
  })
  public phoneNumber!: string;

  @prop({
    match: [/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"],
    default: "",
  })
  public birthDate!: string;

  @prop({ default: false })
  public onlineStatus!: boolean;

  @prop({ default: Date.now })
  public lastSeen!: Date;

  @prop({
    maxlength: 250,
    default: "Hey there I am using chat app...",
  })
  public bio!: string;

  @prop({
    type: () => Object,
    default: {},
    validate: {
      validator: (address: any) => {
        if (!address) return true;
        return (
          (!address.country || address.country.length >= 2) &&
          (!address.city || address.city.length >= 2) &&
          (!address.postalCode || address.postalCode.length >= 3)
        );
      },
      message: "Invalid address format",
    },
  })
  public address?: {
    country?: string;
    city?: string;
    postalCode?: string;
  };

  async validatePassword(
    this: DocumentType<UserDocument>,
    candidatePassword: string,
  ) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.error("Password validation error:", error);
      return false;
    }
  }
}

export const UserModel =
  mongoose.models.UserDocument || getModelForClass(UserDocument);
