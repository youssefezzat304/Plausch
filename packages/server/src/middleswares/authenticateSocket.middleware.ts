import { getToken } from "next-auth/jwt";
import { UserModel } from "@/routes/users/users.model";
import { AuthError } from "@/utils/exception";
import { parse } from "cookie";
import { UserSocket } from "@/types/socket.io";

export async function authenticateSocket(socket: UserSocket): Promise<string> {
  try {
    const cookies = parse(socket.request.headers.cookie || "");
    const sessionToken = cookies["next-auth.session-token"];

    const token = await getToken({
      req: {
        cookies: { "next-auth.session-token": sessionToken },
        headers: {},
      } as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?._id) {
      throw new AuthError("Invalid token");
    }

    const user = await UserModel.findById(token._id);
    if (!user) {
      throw new AuthError("User not found");
    }

    socket.userId = user._id.toString();

    return user._id.toString();
  } catch (error) {
    console.error("Socket authentication error:", error);
    throw new AuthError("Authentication failed");
  }
}
