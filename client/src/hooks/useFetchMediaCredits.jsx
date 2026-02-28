import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchMediaCredits = (mediaType, mediaId) => {
  async function fetchCredits() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/media/credits/${mediaType}/${mediaId}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting credits");
    }
  }

  const query = useQuery({
    queryKey: ["credits", mediaType, mediaId],
    queryFn: fetchCredits,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
