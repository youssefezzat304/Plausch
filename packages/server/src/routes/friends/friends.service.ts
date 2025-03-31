import { InternalServerError, NotFoundError } from "@/utils/exception";
import { UserDocument, UserModel } from "../users/users.model";
import { FriendRequestModel } from "./friends.model";
import { Types } from "mongoose";
import { mongoose } from "@typegoose/typegoose";
import { PrivateChatModel } from "../privateChats/privateChats.model";

export class FriendsService {
  public async getUserPrivateChats(userId: string) {
    try {
      const user = await UserModel.findById(userId).populate({
        path: "privateChats",
        populate: [
          {
            path: "participants",
            model: "UserDocument",
            select: "displayName profilePicture",
          },
          {
            path: "lastMessage",
            model: "MessageDocument",
          },
        ],
      });

      return user?.privateChats || [];
    } catch (error) {
      throw error;
    }
  }

  public async getUserContacts(userId: string) {
    try {
      const user = (await UserModel.findById(userId)
        .populate({
          path: "contacts",
          select: "displayName profilePicture",
          options: {
            sort: { displayName: 1 },
            collation: { locale: "en", strength: 2 },
          },
        })
        .lean()
        .exec()) as UserDocument | null;

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user.contacts || [];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Could not retrieve contacts");
    }
  }

  public async getUserFriendRequests(userId: string) {
    try {
      const friendRequests = await FriendRequestModel.find({
        recipient: userId,
        status: "pending",
      })
        .populate("sender", "displayName profilePicture")
        .sort({ createdAt: -1 })
        .lean();

      return friendRequests;
    } catch (error) {
      throw new InternalServerError("Failed to get user friend requests");
    }
  }

  public async acceptFriendRequest(userId: string, friendId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [userExists, friendExists] = await Promise.all([
        UserModel.exists({ _id: userId }).session(session).lean(),
        UserModel.exists({ _id: friendId }).session(session).lean(),
      ]);

      if (!userExists || !friendExists) {
        throw new InternalServerError("User or friend not found");
      }

      const friendRequest = await FriendRequestModel.findOneAndUpdate(
        {
          sender: new Types.ObjectId(friendId),
          recipient: new Types.ObjectId(userId),
          status: "pending",
        },
        { status: "accepted" },
        { new: true, session },
      ).lean();

      if (!friendRequest) {
        throw new InternalServerError("No pending request found");
      }

      const chat = await PrivateChatModel.create(
        [
          {
            participants: [userId, friendId],
            createdAt: new Date(),
          },
        ],
        { session },
      ).then((docs) => docs[0]);

      await Promise.all([
        UserModel.updateOne(
          { _id: userId },
          {
            $addToSet: {
              contacts: friendId,
              privateChats: chat._id,
            },
            $pull: {
              friendRequests: friendId,
            },
          },
        ).session(session),

        UserModel.updateOne(
          { _id: friendId },
          {
            $addToSet: {
              contacts: userId,
              privateChats: chat._id,
            },
            $pull: {
              sentRequests: userId,
            },
          },
        ).session(session),
      ]);

      await session.commitTransaction();

      return { friendRequest, chat };
    } catch (error) {
      await session.abortTransaction();
      throw new InternalServerError(
        error instanceof Error ? error.message : "Failed to accept request",
      );
    } finally {
      session.endSession();
    }
  }

  public async rejectFriendRequest(userId: string, friendId: string) {
    try {
      const friendRequest = await FriendRequestModel.findOneAndDelete({
        sender: friendId,
        recipient: userId,
        status: "pending",
      });

      await Promise.all([
        UserModel.updateOne(
          { _id: userId },
          { $pull: { friendRequests: friendId } },
        ),
        UserModel.updateOne(
          { _id: friendId },
          { $pull: { sentRequests: userId } },
        ),
      ]);

      return friendRequest;
    } catch (error) {
      throw new InternalServerError("Failed to reject friend request");
    }
  }

  public async addFriend(userId: string, email: string) {
    try {
      const [user, friend] = await Promise.all([
        UserModel.findById(userId)
          .select("friends sentRequests")
          .lean()
          .exec() as Promise<UserDocument | null>,
        UserModel.findOne({ email })
          .collation({ locale: "en", strength: 2 })
          .select("friendRequests _id")
          .lean()
          .exec() as Promise<UserDocument | null>,
      ]);

      if (!user || !friend) {
        throw new InternalServerError("Friend or user not found");
      }

      if (user._id.equals(friend._id)) {
        throw new InternalServerError("Cannot add yourself");
      }

      const [isFriend, hasSentRequest, hasPendingRequest] = await Promise.all([
        UserModel.exists({
          _id: userId,
          friends: friend._id,
        }),
        UserModel.exists({
          _id: userId,
          sentRequests: friend._id,
        }),
        UserModel.exists({
          _id: friend._id,
          friendRequests: user._id,
        }),
      ]);

      if (isFriend) throw new InternalServerError("Friend already added");
      if (hasSentRequest) throw new InternalServerError("Request already sent");
      if (hasPendingRequest)
        throw new InternalServerError("Request already received");

      await Promise.all([
        UserModel.updateOne(
          { _id: userId },
          { $addToSet: { sentRequests: friend._id } },
        ),
        UserModel.updateOne(
          { _id: friend._id },
          { $addToSet: { friendRequests: user._id } },
        ),
      ]);

      await FriendRequestModel.create({
        sender: user._id,
        recipient: friend._id,
        status: "pending",
        createdAt: new Date(),
      });

      const friendRequest = await FriendRequestModel.findOne({
        sender: user._id,
        recipient: friend._id,
        status: "pending",
      })
        .populate("sender", "displayName profilePicture")
        .lean();

      return friendRequest;
    } catch (error) {
      if (error instanceof InternalServerError) {
        throw error;
      }
      throw new InternalServerError(
        error instanceof Error ? error.message : "Failed to add friend",
      );
    }
  }
}
