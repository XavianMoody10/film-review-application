import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchMediaReviews = (mediaType, mediaId) => {
  async function fetchReviews() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/reviews/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting reviews");
    }
  }

  const query = useQuery({
    queryKey: ["reviews", mediaType, mediaId],
    queryFn: fetchReviews,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
