import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { MediaPoster } from "../components/MediaPoster";

export const GenreCollection = () => {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const { mediaType, genreId } = useParams();

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
      // console.log("Yo");
    }
  }, [inView]);

  async function fetchData(page) {
    console.log(page);
    const endpoint = `${import.meta.env.VITE_SERVER_ENDPOINT}/discover/${mediaType}/${genreId}/${page}`;

    try {
      const response = await axios.get(endpoint);
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error getting collection");
    }
  }

  const query = useInfiniteQuery({
    queryKey: ["collection", { mediaType, genreId }],
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.total_pages > lastPage.page) {
        return lastPage.page + 1;
      }
    },
  });

  const mediaMap = query.data?.pages.map((page) => {
    return page?.results.map(
      ({ title, original_name, original_title, id, poster_path }) => {
        return (
          <Link key={id} to={`/details/${mediaType}/${id}`}>
            <MediaPoster
              poster_path={poster_path}
              alt={title || original_title || original_name}
            />
          </Link>
        );
      },
    );
  });

  return (
    <main className="bg-linear-to-b from-black to-gray-900 min-h-screen pt-20 pb-10 px-5">
      <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
        {mediaMap}
      </div>

      {query.isSuccess && query.hasNextPage && (
        <div ref={ref} className=" w-full flex justify-center py-10">
          <ClipLoader color="white"></ClipLoader>
        </div>
      )}
    </main>
  );
};
