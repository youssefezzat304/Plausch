import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import dayjs from "dayjs";
import { UserDocument } from "../users/users.model";

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
}

export class Content {
  @prop({ required: true, enum: MessageType })
  type!: MessageType;

  @prop({ required: false })
  text?: string;

  @prop({ required: false })
  fileUrl?: string;

  @prop({ required: false })
  thumbnailUrl?: string;
}

export class Status {
  @prop({ default: true })
  sent!: boolean;

  @prop({ type: [String], default: [] })
  deliveredTo!: string[];

  @prop({ type: [String], default: [] })
  readBy!: string[];
}

// ===== Main Message Model =====
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class MessageDocument extends TimeStamps {
  @prop({ required: true, ref: "User" })
  senderId!: Ref<UserDocument>;

  @prop({ required: true, index: true })
  conversationId!: string;

  @prop({ required: true, _id: false })
  content!: Content;

  @prop({ required: true, _id: false })
  status!: Status;

  get formattedTimestamp() {
    return dayjs(this.createdAt).format("YYYY-MM-DD HH:mm:ss");
  }
}

export const MessageModel = getModelForClass(MessageDocument);
