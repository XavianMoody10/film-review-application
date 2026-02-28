import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchMediaDetails = (mediaType, mediaId) => {
  async function fetchDetails() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/media/details/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting details");
    }
  }

  const query = useQuery({
    queryKey: ["details", mediaType, mediaId],
    queryFn: fetchDetails,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
