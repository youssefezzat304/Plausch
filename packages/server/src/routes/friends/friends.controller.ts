import { Response, Request, NextFunction, Router } from "express";
import { FriendsService } from "./friends.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";

const friendsController: Router = Router();
const friendsService = new FriendsService();

const getUserPrivateChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const chats = await friendsService.getUserPrivateChats(userId);

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

friendsController.get(
  "/:userId/privateChats",
  authenticateUser,
  getUserPrivateChats,
);
friendsController.get("/:userId/contacts", authenticateUser, getUserContacts);
friendsController.get(
  "/:userId/friendRequests",
  authenticateUser,
  getUserFriendRequests,
);
export default friendsController;

// TODO: POST /:userId/accept/:friendId accept friend request.
// TODO: POST /:userId/reject/:friendId reject friend request.
// TODO: POST /:userId/remove/:friendId remove friend from user's friend list.
// TODO: POST /:userId/block/:friendId block friend.
// TODO: POST /:userId/unblock/:friendId unblock friend.
