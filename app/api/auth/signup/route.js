import { hash } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  const { username, password, email } = await req.json();

  await dbConnect();

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  // Hash password and create user
  const hashedPassword = await hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return new Response(
    JSON.stringify({ message: "User registered successfully" }),
    { status: 201 }
  );
}
