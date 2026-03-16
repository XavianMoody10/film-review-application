import { Link } from "react-router-dom";
import { LazyLoadMediaPoster } from "./LazyLoadMediaPoster";

export const PostersGrid = ({ pages, mediaType }) => {
  // Display media posters
  const posters = pages.map((page) => {
    return page?.results?.map(({ id, poster_path, media_type }) => {
      return (
        <Link key={id} to={`/details/${media_type || mediaType}/${id}`}>
          <LazyLoadMediaPoster poster_path={poster_path} />
        </Link>
      );
    });
  });

  return (
    <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {posters}
    </div>
  );
};
