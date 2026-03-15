import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function fetchTrendingMedia(media_type) {
  const url = `${import.meta.env.VITE_API_URL}/trending/${media_type}`;

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

export const useFetchTrendingMedia = (media_type) => {
  const query = useQuery({
    queryKey: ["trending", { media_type }],
    queryFn: () => fetchTrendingMedia(media_type),
    retry: false,
    staleTime: 1000 * 60 * 15, // Revalidate after 15 minutes
  });

  return query;
};
