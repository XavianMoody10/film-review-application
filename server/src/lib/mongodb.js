import mongoose from "mongoose";

export async function connectToDatabase(params) {
  const MONGOOSE_URL = process.env.MONGOOSE_URL;

  if (!MONGOOSE_URL) {
    throw new Error("MONGOOSE_URL is missing");
  }

  try {
    await mongoose.connect(MONGOOSE_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
    console.log("Mongoose connection error has occured");
  }
}
