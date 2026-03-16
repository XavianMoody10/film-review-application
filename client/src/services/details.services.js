import axios from "axios";

export async function fetchMediaDetails(media_type, series_id, movie_id) {
  const url = `${import.meta.env.VITE_API_URL}/details/${media_type}`;

  try {
    const response = await axios.get(url, { params: { series_id, movie_id } });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
