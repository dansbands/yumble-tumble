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
  const dislikedUser = await User.findById(profileId);

  user.dislikes.push(dislikedUser._id);
  await user.save();

  return new Response(JSON.stringify({ message: "Profile disliked" }), {
    status: 200,
  });
}
