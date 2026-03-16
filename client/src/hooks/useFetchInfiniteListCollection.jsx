import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCollectionByList } from "../services/list.services";

export const useFetchInfiniteListCollection = (media_type, list_value) => {
  const query = useInfiniteQuery({
    queryKey: ["list-infinity", { media_type, list_value }],
    queryFn: ({ pageParam }) =>
      fetchCollectionByList(media_type, list_value, pageParam),
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
