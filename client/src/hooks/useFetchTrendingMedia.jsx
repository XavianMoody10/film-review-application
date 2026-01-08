import { useQuery } from "@tanstack/react-query";
import { getTrendingMediaCollection } from "../services/trending.services";

export const useFetchTrendingMediaCollection = (media) => {
  const query = useQuery({
    queryKey: [media],
    queryFn: () => getTrendingMediaCollection(media),
    retry: false,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  return query;
};
