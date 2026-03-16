import axios from "axios";

export async function fetchCollectionByList(media_type, list_value, page) {
  const url = `${import.meta.env.VITE_API_URL}/list/${media_type}/${list_value}/${page}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!list_value) {
    throw new Error("'list_value' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
