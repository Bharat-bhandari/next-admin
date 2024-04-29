import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

import User from "@/models/UserModel";

export const getUserSession = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    const userSession = await User.findOne({ email: session.user.email });

    return userSession;
  } catch (error) {
    console.log(error);
    return null;
  }
};
