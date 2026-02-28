import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchMediaImages = (mediaType, mediaId) => {
  async function fetchImages() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/media/images/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting images");
    }
  }

  const query = useQuery({
    queryKey: ["images", mediaType, mediaId],
    queryFn: fetchImages,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
