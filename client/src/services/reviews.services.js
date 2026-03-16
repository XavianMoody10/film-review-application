import axios from "axios";

export async function fetchMediaReviews(media_type, media_id) {
  const url = `${import.meta.env.VITE_API_URL}/reviews/${media_type}/${media_id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function postReview(media_type, media_id, postObj) {
  const { title, review, rating } = postObj;

  const url = `${import.meta.env.VITE_API_URL}/reviews/create/${media_type}/${media_id}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!media_id) {
    throw new Error("'media_id' is required");
  }

  if (!title) {
    throw new Error("Please add a title");
  }

  if (!review) {
    throw new Error("Please add a review");
  }

  if (!rating) {
    throw new Error("Rating needs to be 1 or higher");
  }

  try {
    const response = await axios.post(url, postObj);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
