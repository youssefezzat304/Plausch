export interface User {
  _id: string;
  displayName: string;
  email: string;
  profilePicture?: string;
  friends: string[];
  friendRequests: string[];
  sentRequests: string[];
  contacts: string[];
  birthDate?: string;
  onlineStatus?: boolean;
  lastSeen?: Date;
  phoneNumber?: string;
  bio?: string;
  address?: {
    country: string;
    city: string;
    postalCode: string;
  };
}

export interface Message {
  _id: string;
  senderId: string;
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

export interface Chat {
  conversationId: string;
  participants: User[];
  lastMessage?: Message;
  lastActive: string;
}
