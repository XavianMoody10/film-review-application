import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "../services/details.services";

export const useFetchMediaDetails = (media, mediaId) => {
  const query = useQuery({
    queryKey: [media, mediaId],
    queryFn: () => getMediaDetails(media, mediaId),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });
  return query;
};
