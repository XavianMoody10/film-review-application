import { useQuery } from "@tanstack/react-query";
import { getMovieCollectionByList } from "../services/movies.services";

export const useFetchMoviesCollectionByList = (listValue, enabled, page) => {
  const query = useQuery({
    queryKey: ["movies", listValue, page],
    queryFn: () => getMovieCollectionByList(listValue, page),
    retry: false,
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled,
  });

  return query;
};
