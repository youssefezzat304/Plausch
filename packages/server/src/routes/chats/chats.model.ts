import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
  Ref,
  pre,
  index,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { MessageDocument, MessageModel } from "../messages/messages.model";
import { UserDocument } from "../users/users.model";


@pre<ChatDocument>("save", function () {
  this.participants.sort((a, b) => a.toString().localeCompare(b.toString()));
})
@index({ "participants.0": 1, "participants.1": 1 }, { unique: true })
@index({ lastActive: -1 })
@index({ lastMessage: 1 })
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
    _id: true,
  })
  public conversationId!: string;

  @prop({ ref: () => MessageDocument, default: null })
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
