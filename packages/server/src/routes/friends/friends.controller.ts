import { Response, Request, NextFunction, Router } from "express";
import { FriendsService } from "./friends.service";

const friendsController: Router = Router();
const friendsService = new FriendsService();

const getUserFriends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const friends = await friendsService.getUserFriends(userId);
    res.status(200).json(friends);
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

const addFriend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, email } = req.params;

    const friend = await friendsService.addFriend(userId, email);

    res.status(200).json(friend);
  } catch (error) {
    next(error);
  }
};

friendsController.get("/:userId/friends", getUserFriends);
friendsController.get("/:userId/contacts", getUserContacts);
friendsController.post("/:userId/add/:email", addFriend);

export default friendsController;

// TODO: POST /:userId/remove/:friendId remove friend from user's friend list.
// TODO: POST /:userId/accept/:friendId accept friend request.
// TODO: POST /:userId/reject/:friendId reject friend request.
// TODO: POST /:userId/block/:friendId block friend.
// TODO: POST /:userId/unblock/:friendId unblock friend.
