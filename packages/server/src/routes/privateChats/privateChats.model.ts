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
import { Types } from "mongoose";

@pre<PrivateChatDocument>("save", function () {
  this.participants.sort((a, b) => a.toString().localeCompare(b.toString()));
})
@index({ "participants.0": 1, "participants.1": 1 }, { unique: true })
@index({ lastActive: -1 })
@index({ lastMessage: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class PrivateChatDocument extends TimeStamps {
  @prop({
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  public _id!: Types.ObjectId;

  @prop({
    required: true,
    validate: {
      validator: (participants: Ref<UserDocument>[]) =>
        participants.length === 2,
      message: "Private chats must have exactly 2 participants",
    },
  })
  public participants!: Ref<UserDocument>[];

  @prop({ ref: () => MessageDocument, default: null })
  public lastMessage?: Ref<MessageDocument>;

  @prop({ default: Date.now })
  public lastActive!: Date;

  public get messages() {
    return MessageModel.find({ conversationId: this._id.toString() })
      .sort("-createdAt")
      .exec();
  }
}

export const PrivateChatModel = getModelForClass(PrivateChatDocument);
