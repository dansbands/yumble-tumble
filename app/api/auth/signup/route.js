import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.log('error', error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
