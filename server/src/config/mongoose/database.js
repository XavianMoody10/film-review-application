import mongoose from "mongoose";

export async function connectToDatabase() {
  const uri = process.env.MONGOOSE_URI;
  try {
    await mongoose.connect(uri);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
    console.log("Database connection error ");
  }
}
