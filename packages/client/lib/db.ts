import { Chat, Message, User } from "@/types";

export const mockUsers: User[] = [
  {
    _id: "1",
    displayName: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "",
    friends: [],
    birthDate: "1990-01-01",
    onlineStatus: true,
    lastSeen: new Date(),
    phoneNumber: "+1234567890",
    bio: "Hello, I'm John!",
    address: {
      country: "USA",
      city: "New York",
      postalCode: "10001",
    },
  },
  {
    _id: "2",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    profilePicture: "",
    friends: [],
    birthDate: "1995-05-15",
    onlineStatus: false,
    lastSeen: new Date(),
    phoneNumber: "+9876543210",
    bio: "Hi, I'm Jane!",
    address: {
      country: "Canada",
      city: "Toronto",
      postalCode: "M5V 3L9",
    },
  },
  {
    _id: "3",
    displayName: "Alice Johnson",
    email: "alice.johnson@example.com",
    profilePicture: "",
    friends: [],
    birthDate: "1985-12-25",
    onlineStatus: true,
    lastSeen: new Date(),
    phoneNumber: "+1122334455",
    bio: "Hey, I'm Alice!",
    address: {
      country: "UK",
      city: "London",
      postalCode: "SW1A 1AA",
    },
  },
];

export const mockChats: Chat[] = [
  {
    participants: [mockUsers[0], mockUsers[1]], // John Doe and Jane Smith
    conversationId: "conv_1_2", // Generated from user IDs
    lastMessage: {
      _id: "1",
      senderId: mockUsers[0]._id, // John Doe
      conversationId: "conv_1_2",
      content: {
        type: "text",
        text: "Hey Jane, how are you?",
      },
      status: {
        sent: true,
        deliveredTo: [mockUsers[1]._id], // Delivered to Jane
        readBy: [], // Not read yet
      },
      createdAt: new Date().toISOString(),
    },
    lastActive: new Date().toISOString(),
  },
  {
    participants: [mockUsers[0], mockUsers[2]], // John Doe and Alice Johnson
    conversationId: "conv_1_3", // Generated from user IDs
    lastMessage: {
      _id: "2",
      senderId: mockUsers[2]._id, // Alice Johnson
      conversationId: "conv_1_3",
      content: {
        type: "text",
        text: "Hi John, let's catch up soon!",
      },
      status: {
        sent: true,
        deliveredTo: [mockUsers[0]._id], // Delivered to John
        readBy: [mockUsers[0]._id], // Read by John
      },
      createdAt: new Date().toISOString(),
    },
    lastActive: new Date().toISOString(),
  },
  {
    participants: [mockUsers[1], mockUsers[2]], // Jane Smith and Alice Johnson
    conversationId: "conv_2_3", // Generated from user IDs
    lastMessage: {
      _id: "3",
      senderId: mockUsers[1]._id, // Jane Smith
      conversationId: "conv_2_3",
      content: {
        type: "image",
        fileUrl: "https://example.com/image.jpg",
        thumbnailUrl: "https://example.com/thumbnail.jpg",
      },
      status: {
        sent: true,
        deliveredTo: [mockUsers[2]._id], // Delivered to Alice
        readBy: [mockUsers[2]._id], // Read by Alice
      },
      createdAt: new Date().toISOString(),
    },
    lastActive: new Date().toISOString(),
  },
];

export const mockMessages: Message[] = [
  // Conversation between John Doe (1) and Jane Smith (2)
  {
    _id: "1",
    senderId: mockUsers[0]._id, // John Doe
    conversationId: "conv_1_2",
    content: {
      type: "text",
      text: "Hey Jane, how are you?",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[1]._id], // Delivered to Jane
      readBy: [], // Not read yet
    },
    createdAt: "2023-09-20T10:00:00Z",
  },
  {
    _id: "2",
    senderId: mockUsers[1]._id, // Jane Smith
    conversationId: "conv_1_2",
    content: {
      type: "text",
      text: "Hi John! I'm good, thanks. How about you?",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[0]._id], // Delivered to John
      readBy: [mockUsers[0]._id], // Read by John
    },
    createdAt: "2023-09-20T10:05:00Z",
  },
  {
    _id: "3",
    senderId: mockUsers[0]._id, // John Doe
    conversationId: "conv_1_2",
    content: {
      type: "text",
      text: "I'm doing great! Let's catch up soon.",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[1]._id], // Delivered to Jane
      readBy: [], // Not read yet
    },
    createdAt: "2023-09-20T10:10:00Z",
  },

  // Conversation between John Doe (1) and Alice Johnson (3)
  {
    _id: "4",
    senderId: mockUsers[2]._id, // Alice Johnson
    conversationId: "conv_1_3",
    content: {
      type: "text",
      text: "Hi John, let's catch up soon!",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[0]._id], // Delivered to John
      readBy: [mockUsers[0]._id], // Read by John
    },
    createdAt: "2023-09-20T11:00:00Z",
  },
  {
    _id: "5",
    senderId: mockUsers[0]._id, // John Doe
    conversationId: "conv_1_3",
    content: {
      type: "text",
      text: "Sure, Alice! How about this weekend?",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[2]._id], // Delivered to Alice
      readBy: [], // Not read yet
    },
    createdAt: "2023-09-20T11:05:00Z",
  },

  // Conversation between Jane Smith (2) and Alice Johnson (3)
  {
    _id: "6",
    senderId: mockUsers[1]._id, // Jane Smith
    conversationId: "conv_2_3",
    content: {
      type: "image",
      fileUrl: "https://example.com/image.jpg",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[2]._id], // Delivered to Alice
      readBy: [mockUsers[2]._id], // Read by Alice
    },
    createdAt: "2023-09-20T12:00:00Z",
  },
  {
    _id: "7",
    senderId: mockUsers[2]._id, // Alice Johnson
    conversationId: "conv_2_3",
    content: {
      type: "text",
      text: "Nice picture! Where was this taken?",
    },
    status: {
      sent: true,
      deliveredTo: [mockUsers[1]._id], // Delivered to Jane
      readBy: [], // Not read yet
    },
    createdAt: "2023-09-20T12:05:00Z",
  },
];
