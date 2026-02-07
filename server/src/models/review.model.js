import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  mediaId: Number,
  reviews: Array,
});

export const Review =
  mongoose.models.review || mongoose.model("review", reviewSchema);
