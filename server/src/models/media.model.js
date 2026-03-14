import mongoose from "mongoose";
const { Schema } = mongoose;

const mediaSchema = new Schema({
  media_id: String,
  media_type: String,
  reviews: [{ title: String, review: String, rating: Number }],
});

export const Media = mongoose.model("Media", mediaSchema);
