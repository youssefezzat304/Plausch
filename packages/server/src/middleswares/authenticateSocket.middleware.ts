import { Socket } from "socket.io";
import jwt from "jsonwebtoken"; // For JWT authentication
import { UserModel } from "@/routes/users/users.model";
import { verifyJwt } from "@/utils/jwt";

/**
 * Authenticate Socket.IO connections using JWT.
 * @param socket - The Socket.IO socket instance.
 * @returns Promise<string> - Resolves with the authenticated user's ID.
 */
export async function authenticateSocket(socket: Socket): Promise<string> {
  try {
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      throw new Error("Authentication token not provided");
    }

    const decoded = verifyJwt(token, "accessTokenPublicKey") as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    (socket as any).userId = user._id.toString();

    return user._id.toString();
  } catch (error) {
    console.error("Socket authentication error:", error);
    throw new Error("Authentication failed");
  }
}
