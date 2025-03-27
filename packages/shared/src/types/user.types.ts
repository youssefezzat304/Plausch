export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  password: string;
  profilePicture: string;
  chats: string[];
  sentRequests: string[];
  friendRequests: string[];
  contacts: string[];
  phoneNumber: string;
  birthDate: string;
  onlineStatus: boolean;
  lastSeen: Date;
  bio: string;
  address?: {
    country?: string;
    city?: string;
    postalCode?: string;
  };
}
