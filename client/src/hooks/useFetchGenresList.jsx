import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchGenresList(media_type) {
  const url = `${import.meta.env.VITE_API_URL}/genres/${media_type}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const useFetchGenresList = (media_type) => {
  const query = useQuery({
    queryKey: ["genres", { media_type }],
    queryFn: () => fetchGenresList(media_type),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return query;
};
