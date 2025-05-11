import mongoose from "npm:mongoose@^6.7";
import { MONGO_URL } from "../utils/constants.ts";

export async function connectMongoDB() {
  if (!MONGO_URL) {
    throw new Error("Mongo DB URL is not provided ");
  }
  try {
    await mongoose.connect(MONGO_URL);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfullyyyy.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected.");
    });
  } catch (error) {
    console.log(error);
  }
}
