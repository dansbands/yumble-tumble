import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.error("Please fill all fields", 400);
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return NextResponse.error("Email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser.id },
      201
    );
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}
