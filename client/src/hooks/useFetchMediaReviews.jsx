import { useQuery } from "@tanstack/react-query";
import { fetchMediaReviews } from "../services/reviews.services";

export const useFetchMediaReviews = (media_type, media_id) => {
  const query = useQuery({
    queryKey: ["reviews", { media_type, media_id }],
    queryFn: () => fetchMediaReviews(media_type, media_id),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
