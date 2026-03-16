import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMedia } from "../services/trending.services";

export const useFetchTrendingMedia = (media_type) => {
  const query = useQuery({
    queryKey: ["trending", { media_type }],
    queryFn: () => fetchTrendingMedia(media_type),
    retry: false,
    staleTime: 1000 * 60 * 15, // Revalidate after 15 minutes
  });

  return query;
};
