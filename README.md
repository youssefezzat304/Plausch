# [Dialog.io](https://github.com/youssefezzat304/Dialog.io-realtime-chat)

A real-time chat application built with Next.js, Node.js, Express, Socket.IO, MongoDB, and TypeScript . This project is primarily developed for **educational purposes**, serving as a hands-on learning experience in building real-time web applications with modern web technologies.

## Installation & Setup

Clone the Repository

```Terminal
git clone https://github.com/youssefezzat304/Dialog.io-realtime-chat.git
cd chat-app
```

Install Dependencies

```Terminal
cd backend
npm install
```

```Terminal
cd client
npm install
```

Setup environment variables

backend

frontend

Run the app

## Features

### Currently Available

- 🔒 **Authentication & Authorization**
- 📬 **Real-time Messaging**
- 🖼️ **User Profiles & Avatars**
- 📡 **WebSockets for Instant Updates**
- 🤝 **Add and Remove Friends**

### Upcoming

- **📂 Sending Media Files** (Images, Videos, Documents)
- ✅ **Status Check** (Online/Offline & Custom Status)
- 🔍 **Search** (Users, Messages, and Chats)
- 👥 **Group Chat** (Multiple Participants, Admin Controls)
- 🚫 **Block Users** (Prevent Unwanted Interactions)
- 🎤 **Voice Notes** (Send and Receive Audio Messages)
- 📹 **Video Calls** (One-on-One & Group Video Calls)
- 🧑‍💻 **End-to-End Encryption**
- 🌙 **Dark Mode & Custom Themes**
- 📌 **Pinned Messages & Starred Chats**
- 📨 **Scheduled & Self-Destructing Messages**
- 🔄 **Message Reactions & Edits**
- 🌍 **Multi-Language Support**
- 🤖 **AI Chatbot Integration**

## API Documentation

### User Authentication

| Method | Endpoint             | Description         | Authentication required |
| ------ | -------------------- | ------------------- | ----------------------- |
| `POST` | `/api/auth/register` | Register a new user | ❌ No                   |
| `POST` | `/api/auth/login`    | Login user          | ❌ No                   |
| `POST` | `/api/auth/logout`   | Logout user         | ✅ Yes                  |
| `GET`  | `/api/auth/me`       | Get current user    | ✅ Yes                  |

### Chat Routes

## 🖼️ Screenshots

## License

This project is licensed under the **MIT License** .
