import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
});

export const User = mongoose.models.user || mongoose.model("User", userSchema);
