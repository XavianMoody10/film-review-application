import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { FeaturedMediaSlider } from "../components/FeaturedMediaSliders";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import axios from "axios";
import { LazyLoadingMediaSlider } from "../components/LazyLoadingMediaSlider";
import { useQuery } from "@tanstack/react-query";

async function fetchCollectionByList(media_type, list_value, page) {
  const url = `${import.meta.env.VITE_API_URL}/list/${media_type}/${list_value}/${page}`;

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

async function fetchGenresList(media_type) {
  const url = `${import.meta.env.VITE_API_URL}/genres/${media_type}`;

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
        <Link
          to={`/collection/genre/${media_type}/${id}`}
          className=" block w-fit"
        >
          <h2 className=" text-2xl font-urbanist text-white tracking-wider">
            {name}
          </h2>
        </Link>

        <LazyLoadingMediaSlider
          mediaType={media_type}
          queryKey={["discover", { media_type, with_genre: id }]}
          queryFn={() => fetchCollectionByGenre(media_type, id, 1)}
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
                queryFn={() =>
                  fetchCollectionByList(media_type, "now_playing", 1)
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
                queryFn={() => fetchCollectionByList(media_type, "popular", 1)}
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
                queryFn={() =>
                  fetchCollectionByList(media_type, "top_rated", 1)
                }
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
                queryFn={() => fetchCollectionByList(media_type, "upcoming", 1)}
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
                  fetchCollectionByList(media_type, "airing_today", 1)
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
                  fetchCollectionByList(media_type, "on_the_air", 1)
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
                queryFn={() => fetchCollectionByList(media_type, "popular", 1)}
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
                queryFn={() =>
                  fetchCollectionByList(media_type, "Top Rated", 1)
                }
              />
            </div>
          </>
        )}

        {genresMap}
      </div>
    </MainWrapper>
  );
};
