import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadingMediaSlider } from "./LazyLoadingMediaSlider";

export const MovieListLazyLoadingSliders = ({
  media_type = "movie",
  fetchCollectionByListEvent,
}) => {
  return (
    <>
      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/now_playing`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Now Playing
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "now_playing" }]}
          queryFn={() =>
            fetchCollectionByListEvent(media_type, "now_playing", 1)
          }
        />
      </div>

      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/popular`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Popular
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "popular" }]}
          queryFn={() => fetchCollectionByListEvent(media_type, "popular", 1)}
        />
      </div>

      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/now_playing`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Top Rated
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "top_rated" }]}
          queryFn={() => fetchCollectionByListEvent(media_type, "top_rated", 1)}
        />
      </div>

      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/now_playing`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Upcoming
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "upcoming" }]}
          queryFn={() => fetchCollectionByListEvent(media_type, "upcoming", 1)}
        />
      </div>
    </>
  );
};
