import { useQuery } from "@tanstack/react-query";
import { getMediaReviews } from "../services/reviews.services";

export const useFetchMediaReviews = (media, mediaId) => {
  const query = useQuery({
    queryKey: ["reviews", media, mediaId],
    queryFn: () => getMediaReviews(media, mediaId),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });

  return query;
};
