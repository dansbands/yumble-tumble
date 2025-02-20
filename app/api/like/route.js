import { getSession } from "next-auth/react";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  const session = await getSession({ req });
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  const user = await User.findById(session.userId);
  const { profileId } = await req.json();
  const likedUser = await User.findById(profileId);

  user.likes.push(likedUser._id);
  await user.save();

  if (likedUser.likes.includes(user._id)) {
    // It's a match!
    // Implement match logic here
  }

  return new Response(JSON.stringify({ message: "Profile liked" }), {
    status: 200,
  });
}
