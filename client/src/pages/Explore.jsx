import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { FeaturedMediaSlider } from "../components/FeaturedMediaSliders";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import axios from "axios";
import { LazyLoadingMediaSlider } from "../components/LazyLoadingMediaSlider";
import { useQuery } from "@tanstack/react-query";

async function fetchCollectionByList(media_type, list_value) {
  const url = `http://localhost:3000/list/${media_type}/${list_value}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!list_value) {
    throw new Error("'list_value' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function fetchCollectionByGenre(media_type, genre_id) {
  const url = `http://localhost:3000/genres/discover/${media_type}/${genre_id}`;

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

async function fetchGenresList(media_type) {
  const url = `http://localhost:3000/genres/${media_type}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const Explore = () => {
  const { media_type } = useParams();
  const trendingQuery = useFetchTrendingMedia(media_type);
  const genresQuery = useQuery({
    queryKey: ["genres", { media_type }],
    queryFn: () => fetchGenresList(media_type),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const genresMap = genresQuery.data?.genres?.map(({ id, name }) => {
    return (
      <div key={id} className=" max-w-300 mx-auto relative space-y-8">
        <h2 className=" text-2xl font-urbanist text-white tracking-wider">
          {name}
        </h2>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["discover", { media_type, with_genre: id }]}
          queryFn={() => fetchCollectionByGenre(media_type, id)}
        />
      </div>
    );
  });

  return (
    <MainWrapper>
      <div className=" pt-24 pb-10 px-4 space-y-20">
        <div className=" min-h-150 max-w-300 mx-auto relative">
          <FeaturedMediaSlider results={trendingQuery.data?.results} />
          <LoadingOverlay isLoading={trendingQuery.isLoading} zIndex={99} />
          <ErrorMessageOverlay erorrMessage={trendingQuery.error?.message} />
        </div>

        {media_type === "movie" && (
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
                queryFn={() => fetchCollectionByList(media_type, "now_playing")}
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
                queryFn={() => fetchCollectionByList(media_type, "popular")}
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
                queryFn={() => fetchCollectionByList(media_type, "top_rated")}
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
                queryFn={() => fetchCollectionByList(media_type, "upcoming")}
              />
            </div>
          </>
        )}

        {media_type === "tv" && (
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
                  fetchCollectionByList(media_type, "airing_today")
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
                queryFn={() => fetchCollectionByList(media_type, "on_the_air")}
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
                queryFn={() => fetchCollectionByList(media_type, "popular")}
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
                queryFn={() => fetchCollectionByList(media_type, "Top Rated")}
              />
            </div>
          </>
        )}

        {genresMap}
      </div>
    </MainWrapper>
  );
};
