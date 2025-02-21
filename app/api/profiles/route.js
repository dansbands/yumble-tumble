import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  await connectToDatabase();
  const profiles = await User.find();
  return new Response(JSON.stringify(profiles), { status: 200 });
}
