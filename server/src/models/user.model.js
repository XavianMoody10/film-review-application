import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  reviews: Array,
});

export const User = mongoose.models.user || mongoose.model("User", userSchema);
