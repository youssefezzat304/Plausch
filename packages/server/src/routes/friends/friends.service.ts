import { UserModel } from "../users/users.model";

export class FriendsService {
  public async getUserFriends(userId: string) {
    try {
      const user = await UserModel.findById(userId).populate(
        "friends",
        "displayName profilePicture",
      );
      return user?.friends;
    } catch (error) {
      throw new Error("Failed to get user friends");
    }
  }

  public async getUserContacts(userId: string) {
    try {
      const user = await UserModel.findById(userId).populate(
        "contacts",
        "displayName profilePicture",
      );
      return user?.friends;
    } catch (error) {
      throw new Error("Failed to get user friends");
    }
  }

  public async addFriend(userId: string, email: string) {
    try {
      const user = await UserModel.findById(userId);
      const friend = await UserModel.findOne({ email });
      if (!friend || !user) {
        throw new Error("Friend or user not found");
      }
      user?.sentRequests.push(friend?._id);
      friend?.friendRequests.push(friend?._id);

      await Promise.all([user.save(), friend.save()]);

      return user;
    } catch (error) {
      throw new Error("Failed to add friend");
    }
  }
}
