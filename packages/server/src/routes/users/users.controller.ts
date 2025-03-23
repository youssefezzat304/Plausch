import { NextFunction, Request, Response, Router } from "express";
import UserService from "./users.service";
import authenticateUser from "@/middleswares/authenticateUser.middleware";

const userController: Router = Router();
const userService = new UserService();

const updateInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const data = req.body;

    const updatedUser = await userService.updateUserInfo(userId, data);

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// TODO: GET "/" get all users for search.
// TODO: GET "/:userId" Get a specific user's profile.
// TODO: GET "/:userId/status" get user status.
// TODO: DELETE "/:userId" Delete a user account.

// TODO: ${update)$ PATCH "/:userId" Update user profile.
userController.patch("/users/:userId", authenticateUser, updateInfo);

export default userController;
