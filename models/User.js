import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String, // Profile picture
  password: String, // Only needed if using credentials login
  bio: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female", "other"] },
  preferences: {
    interestedIn: {
      type: String,
      enum: ["male", "female", "both"],
      default: "both",
    },
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
