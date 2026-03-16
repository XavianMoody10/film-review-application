import React from "react";

export const TVListLazyLoadingSliders = ({
  media_type = "tv",
  fetchCollectionByListEvent,
}) => {
  return (
    <>
      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/airing_today`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Airing Today
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "airing_today" }]}
          queryFn={() =>
            fetchCollectionByListEvent(media_type, "airing_today", 1)
          }
        />
      </div>

      <div className=" max-w-300 mx-auto relative space-y-8">
        <Link
          to={`/collection/list/${media_type}/on_the_air`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            On The Air
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "on_the_air" }]}
          queryFn={() =>
            fetchCollectionByListEvent(media_type, "on_the_air", 1)
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
          to={`/collection/list/${media_type}/top_rated`}
          className=" block border-b hover:border-white w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            Top Rated
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["list", { media_type, list_value: "Top Rated" }]}
          queryFn={() => fetchCollectionByListEvent(media_type, "Top Rated", 1)}
        />
      </div>
    </>
  );
};
