export const QueryKeys = {
  CONTACTS: "contacts",
  USER_PROFILE: "userProfile",
  CHATS: "chats",
  FRIENDS: (userId: string) => ["friends", userId],
  FRIEND_REQUESTS: (userId: string) => ["friendRequests", userId],
} as const;
