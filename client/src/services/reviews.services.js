import axios from "axios";

export async function getMediaReviews(media, mediaId) {
  try {
    const url = `https://localhost:3001/reviews`;
    const response = await axios.get(url, {
      params: {
        media,
        mediaId,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error occured while posting review");
  }
}

export async function postMediaReview(formData, media, mediaId) {
  const { title, review, rating } = formData;

  if (!title) {
    throw new Error("Please include a title");
  }

  if (!review) {
    throw new Error("Please add a review");
  }

  if (!rating) {
    throw new Error("Please enter a rating");
  }

  try {
    const url = "https://localhost:3001/reviews";
    const response = await axios.post(url, {
      title,
      review,
      rating: 2.5,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error occured while posting review");
  }
}
