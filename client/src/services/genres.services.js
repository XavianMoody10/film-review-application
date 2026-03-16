import axios from "axios";

export async function fetchCollectionByGenre(media_type, genre_id, page = 1) {
  const url = `${import.meta.env.VITE_API_URL}/genres/discover/${media_type}/${genre_id}/${page}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!genre_id) {
    throw new Error("'genre_id' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
