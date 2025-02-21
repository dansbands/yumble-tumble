import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { email } = await params;
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(user), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectToDatabase();
    const { email } = await params;
  const { name, bio } = await req.json();
  const user = await User.findOneAndUpdate(
    { email },
    { name, bio },
  );
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(user), { status: 200 });
}