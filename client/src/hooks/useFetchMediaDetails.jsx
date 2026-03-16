import { useQuery } from "@tanstack/react-query";
import { fetchMediaDetails } from "../services/details.services";

export const useFetchMediaDetails = (media_type, media_id) => {
  const query = useQuery({
    queryKey: ["details", { media_type, media_id }],
    queryFn: () =>
      fetchMediaDetails(
        media_type,
        media_type === "tv" ? media_id : null,
        media_type === "movie" ? media_id : null,
      ),
    staleTime: 0,
  });

  return query;
};
