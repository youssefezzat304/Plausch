import { IUser } from "@shared/types/user.types";

export interface Message {
  _id: string;
  sender: IUser;
  conversationId: string;
  content: {
    type: "text" | "image";
    text?: string;
    fileUrl?: string;
    thumbnailUrl?: string;
  };
  status: {
    sent: boolean;
    deliveredTo: string[];
    readBy: string[];
  };
  createdAt: string;
}

export interface PrivateChat {
  _id: string;
  participants: IUser[];
  lastMessage?: Message;
  lastActive: Date;
}

export type FriendRequest = {
  _id: string;
  sender: IUser;
  recipient: IUser;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt?: Date;
};
