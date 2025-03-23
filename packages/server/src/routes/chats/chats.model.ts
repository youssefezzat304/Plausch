import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { UserDocument } from "../users/users.model";
import { MessageDocument, MessageModel } from "../messages/messages.model";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ChatDocument extends TimeStamps {
  @prop({
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: (participants: Ref<UserDocument>[]) =>
        participants.length === 2,
      message: "Private chats must have exactly 2 participants",
    },
  })
  public participants!: Ref<UserDocument>[];

  @prop({
    required: true,
    unique: true,
    index: true,
  })
  public conversationId!: string;

  @prop({ ref: () => MessageDocument })
  public lastMessage?: Ref<MessageDocument>;

  @prop({ default: Date.now })
  public lastActive!: Date;

  public get messages() {
    return MessageModel.find({ conversationId: this.conversationId })
      .sort("-createdAt")
      .exec();
  }
}

export const ChatModel = getModelForClass(ChatDocument);
