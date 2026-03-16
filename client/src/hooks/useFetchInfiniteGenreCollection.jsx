import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCollectionByGenre } from "../services/discover.services";

export const useFetchInfiniteGenreCollection = (media_type, genre_id) => {
  const query = useInfiniteQuery({
    queryKey: ["genre", { media_type, genre_id }],
    queryFn: ({ pageParam }) =>
      fetchCollectionByGenre(media_type, genre_id, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return null;
      }
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // Revalidate in 10 minutes
  });

  return query;
};
