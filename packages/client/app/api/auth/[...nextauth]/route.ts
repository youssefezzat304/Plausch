import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/auth";
import { IUser } from "@shared/types";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: login,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: IUser }) => {
      if (user) {
        return {
          ...token,
          _id: user._id,
          displayName: user.displayName,
          email: user.email,
          profilePicture: user.profilePicture,
          privateChats: user.privateChats,
          sentRequests: user.sentRequests,
          friendRequests: user.friendRequests,
          contacts: user.contacts,
          phoneNumber: user.phoneNumber,
          birthDate: user.birthDate,
          onlineStatus: user.onlineStatus,
          lastSeen: user.lastSeen,
          bio: user.bio,
          address: user.address,
        };
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      return {
        ...session,
        user: {
          _id: token._id,
          displayName: token.displayName,
          email: token.email,
          profilePicture: token.profilePicture,
          privateChats: token.privateChats,
          sentRequests: token.sentRequests,
          friendRequests: token.friendRequests,
          contacts: token.contacts,
          phoneNumber: token.phoneNumber,
          birthDate: token.birthDate,
          onlineStatus: token.onlineStatus,
          lastSeen: token.lastSeen,
          bio: token.bio,
          address: token.address,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
