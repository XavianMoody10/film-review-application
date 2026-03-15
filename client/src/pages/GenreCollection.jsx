import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LazyLoadMediaPoster } from "../components/LazyLoadMediaPoster";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

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

export const GenreCollection = () => {
  const { media_type, genre_id } = useParams();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

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

  const posters = query.data?.pages.map((page) => {
    return page?.results?.map(({ id, poster_path }) => {
      return (
        <Link key={id} to={`/details/${media_type}/${id}`}>
          <LazyLoadMediaPoster poster_path={poster_path} />
        </Link>
      );
    });
  });

  return (
    <MainWrapper>
      <div className=" px-10 pt-28 pb-10 space-y-10">
        <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {posters}
        </div>

        {query.hasNextPage && (
          <div
            className=" w-full border border-white h-25 flex items-center justify-center"
            ref={ref}
          >
            <ClipLoader size={20} color="white" />
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
