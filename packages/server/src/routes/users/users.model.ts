import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

@pre<UserDocument>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class UserDocument {
  @prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
  public _id!: Types.ObjectId;

  @prop({ required: true })
  public displayName!: string;

  @prop({ lowercase: true, required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ default: "https://github.com/shadcn.png" })
  public profilePicture?: string;

  @prop({ ref: "UserDocument", default: [] })
  public friends!: Ref<UserDocument>[];

  @prop({ ref: "UserDocument", default: [] })
  public friendRequests!: Ref<UserDocument>[];

  @prop({ ref: "UserDocument", default: [] })
  public sentRequests!: Ref<UserDocument>[];

  @prop({ ref: "UserDocument", default: [] })
  public contacts!: Ref<UserDocument>[];

  @prop({ default: "" })
  public birthDate!: string;

  @prop({ default: false })
  public onlineStatus?: boolean;

  @prop({ default: Date.now })
  public lastSeen!: Date;

  @prop({ default: "" })
  public phoneNumber?: string;

  @prop({ default: "Hey there I am using chat app..." })
  public bio!: string;

  @prop({ default: { country: "", city: "", postalCode: "" } })
  public address?: {
    country: string;
    city: string;
    postalCode: string;
  };

  async validatePassword(
    this: DocumentType<UserDocument>,
    candidatePassword: string,
  ) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.log(error, "Couldn't validate password.");
      return false;
    }
  }
}

export const UserModel = getModelForClass(UserDocument);
