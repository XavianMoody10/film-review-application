import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCollectionByGenre(media_type, genre_id, page = 1) {
  const url = `${import.meta.env.VITE_API_URL}/genres/discover/${media_type}/${genre_id}/${page}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!genre_id) {
    throw new Error("'genre_id' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

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
