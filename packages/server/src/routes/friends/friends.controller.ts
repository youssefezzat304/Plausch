import { Response, Request, NextFunction, Router } from "express";
import { FriendsService } from "./friends.service";

const friendsController: Router = Router();
const friendsService = new FriendsService();

const getUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const chats = await friendsService.getUserChats(userId);

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

const getUserContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const friends = await friendsService.getUserContacts(userId);

    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

const getUserFriendRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const friendRequests = await friendsService.getUserFriendRequests(userId);

    res.status(200).json(friendRequests);
  } catch (error) {
    next(error);
  }
};

const addFriend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, email } = req.params;

    const friend = await friendsService.addFriend(userId, email);

    res.status(200).json(friend);
  } catch (error) {
    next(error);
  }
};

const acceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, friendId } = req.params;

    const friendRequest = await friendsService.acceptFriendRequest(
      userId,
      friendId,
    );

    return res.status(200).json(friendRequest);
  } catch (error) {
    next(error);
  }
};

const rejectFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, friendId } = req.params;

    const friendRequest = await friendsService.rejectFriendRequest(
      userId,
      friendId,
    );

    return res.status(200).json(friendRequest);
  } catch (error) {
    next(error);
  }
};

friendsController.get("/:userId/chats", getUserChats);
friendsController.get("/:userId/contacts", getUserContacts);
friendsController.post("/:userId/add/:email", addFriend);
friendsController.get("/:userId/friendRequests", getUserFriendRequests);
friendsController.post("/:userId/accept/:friendId", acceptFriendRequest);
friendsController.post("/:userId/reject/:friendId", rejectFriendRequest);

export default friendsController;

// TODO: POST /:userId/accept/:friendId accept friend request.
// TODO: POST /:userId/reject/:friendId reject friend request.
// TODO: POST /:userId/remove/:friendId remove friend from user's friend list.
// TODO: POST /:userId/block/:friendId block friend.
// TODO: POST /:userId/unblock/:friendId unblock friend.
