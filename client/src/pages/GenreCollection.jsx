import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { LazyLoadMediaPoster } from "../components/LazyLoadMediaPoster";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useFetchInfiniteGenreCollection } from "../hooks/useFetchInfiniteGenreCollection";

export const GenreCollection = () => {
  const { media_type, genre_id } = useParams();
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Custom hook
  const query = useFetchInfiniteGenreCollection(media_type, genre_id);

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  // Display posters
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
