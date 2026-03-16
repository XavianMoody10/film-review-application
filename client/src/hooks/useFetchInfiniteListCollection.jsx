import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCollectionByList(media_type, list_value, page = 1) {
  const url = `${import.meta.env.VITE_API_URL}/list/${media_type}/${list_value}/${page}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!list_value) {
    throw new Error("'list_value' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

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
