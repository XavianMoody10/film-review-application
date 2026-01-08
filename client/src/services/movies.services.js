import axios from "axios";

export async function getMovieCollectionByList(listValueStr) {
  if (!listValueStr) {
    throw new Error("listValueStr is undefined");
  }

  try {
    const url = `https://localhost:3001/movies/${listValueStr}`;
    const headers = {
      accept: "application/json",
      Authorization: import.meta.env.API_ECRET,
    };
    const response = await axios.get(url, headers);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error occured while getting collection");
  }
}
