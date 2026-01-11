import { Link, useLocation, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "motion/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovieCollectionByList } from "../services/movies.services";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { MediaPoster } from "../components/MediaPoster";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";

export const Collection = () => {
  const location = useLocation();
  const { list } = useParams();
  const media = location.pathname.split("/")[1];
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  async function fetchCollection({ pageParam }) {
    const res = await getMovieCollectionByList(list, pageParam);
    return res;
  }

  const query = useInfiniteQuery({
    queryKey: [media, list],
    queryFn: fetchCollection,
    initialPageParam: 1,
    getNextPageParam: (lastPage, page) => {
      if (lastPage.page + 1 > 2) {
        return;
      } else {
        return lastPage.page + 1;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  const collection = query.data?.pages.map((page) => {
    return page.results.map((film) => {
      return (
        <Link key={film.id} to={`/${media}/details/${film.id}`}>
          <MediaPoster
            original_title={film.original_title || film.title}
            poster_path={film.poster_path}
          />
        </Link>
      );
    });
  });

  return (
    <>
      <AnimatePresence>
        {query.isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: query.isLoading ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className=" fixed top-0 left-0 bottom-0 h-screen w-full flex items-center justify-center bg-white z-50"
          >
            <ClipLoader size={30} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="  min-h-screen bg-[#F5F5F5] pt-24 px-5">
        <div className=" space-y-2  max-w-400 mx-auto">
          <div className=" grid grid-cols-1 gap-5 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {collection}
          </div>

          {query.hasNextPage && !query.isError && (
            <div ref={ref} className=" h-12.5 flex items-center justify-center">
              <ClipLoader size={30} />
            </div>
          )}

          {query.hasNextPage && query.isError && (
            <div
              ref={ref}
              className=" h-12.5 flex items-center justify-center gap-2 bg-red-600 text-white text-lg font-medium rounded-md"
            >
              Error occured getting loading data
              <ErrorIcon size={30} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
