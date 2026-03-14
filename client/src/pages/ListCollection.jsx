import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LazyLoadMediaPoster } from "../components/LazyLoadMediaPoster";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

async function fetchCollectionByList(media_type, list_value, page = 1) {
  const url = `http://localhost:3000/list/${media_type}/${list_value}/${page}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!list_value) {
    throw new Error("'list_value' is required");
  }

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const ListCollection = () => {
  const { media_type, list_value } = useParams();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

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
        {query.isSuccess && (
          <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {posters}
          </div>
        )}

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
