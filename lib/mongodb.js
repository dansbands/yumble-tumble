import mongoose from "mongoose";  

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
 throw new Error("Please add you MongoDB URI to .env");  
};

let cached = global.mongoose;

export const connectDB = async () => {  

  if (cached) {
    return cached;
  }

  if (!cached) {
    cached = mongoose;
  }
  cached = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global.mongoose = cached;
  return cached;
}