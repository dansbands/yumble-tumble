import { getSession } from "next-auth/react";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

const Chat = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectToDatabase();
  const user = await User.findById(session.userId);
  const matchedUser = await User.findById(req.body.matchedUserId);

  // Implement chat logic here

  res.status(200).json({ message: "Chat initiated" });
};

export default Chat;