import { useInfiniteQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";

export const Collection = () => {
  const { media, list } = useParams();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Fetch data from api
  async function fetchMediaData({ pageParam }) {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${media}/list/${list}/${pageParam}`,
    );

    if (!response.ok && query.data?.pages.length >= 1) {
      throw new Error("Error getting next page");
    }

    if (!response.ok && query.data?.pages.length === undefined) {
      throw new Error("Error getting collection");
    }

    const data = await response.json();

    return data;
  }

  const query = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchMediaData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  const slides = query.data?.pages.map((pages) => {
    return pages?.results.map(({ id, original_title, poster_path }) => {
      const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
      return (
        <Link
          key={id}
          to={`/details/${media}/${id}`}
          className=" min-h-62.5 w-full bg-cover bg-no-repeat bg-center relative"
        >
          <img src={posterUrl} alt={original_title} className=" w-full" />
          <div className=" absolute top-0 left-0 bottom-0 right-0 bg-black/60 flex items-end p-6 opacity-0 hover:opacity-100 duration-150"></div>
        </Link>
      );
    });
  });

  return (
    <>
      <Header />

      <MainWrapper>
        <div className=" p-5 pt-20 space-y-5">
          <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {slides}
          </div>

          {query.data?.pages.length === undefined && query.isLoading && (
            <div className=" h-screen flex items-center justify-center">
              <ClipLoader color="white" />
            </div>
          )}

          {query.isSuccess && query.hasNextPage && (
            <div ref={ref} className=" flex justify-center">
              <ClipLoader color="white" />
            </div>
          )}

          {query.isError && query.data?.pages.length >= 1 && (
            <div className=" flex justify-center text-white text-xl font-semibold tracking-wider">
              <div className=" w-full max-w-87.5">
                <div className=" bg-red-500 font-semibold py-3 w-full tracking-wider text-center text-white flex items-center justify-center gap-1.5 rounded-md">
                  {query.error.message}
                  <ErrorIcon size={30} />
                </div>
              </div>
            </div>
          )}

          {query.isError && query.data?.pages.length === undefined && (
            <div className=" h-screen flex items-center justify-center">
              <div className=" w-full max-w-87.5">
                <div className=" bg-red-500 font-semibold py-3 w-full tracking-wider text-center text-white flex items-center justify-center gap-1.5 rounded-md">
                  {query.error.message}
                  <ErrorIcon size={30} />
                </div>
              </div>
            </div>
          )}
        </div>
      </MainWrapper>
    </>
  );
};
