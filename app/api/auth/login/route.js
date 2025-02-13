import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.error("All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.error("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.error("Invalid password", 401);
    }

    const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("auth_token", token, { httpOnly: true, secure: true });

    return response;
  } catch (error) {
    return NextResponse.error(error.message, 500);
  }
}