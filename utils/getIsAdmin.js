import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getIsAdmin = async () => {
  try {
    const session = await getServerSession(authOptions);

    console.log(session);

    if (!session || !session.user) {
      return null;
    }

    const userSession = await User.findOne({ email: session.user.email });

    console.log(userSession);

    if (userSession.role == "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
