import { useQuery } from "@tanstack/react-query";
import { fetchGenresList } from "../services/genres.services";

export const useFetchGenresList = (media_type) => {
  const query = useQuery({
    queryKey: ["genres", { media_type }],
    queryFn: () => fetchGenresList(media_type),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return query;
};
