import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { FeaturedMediaSlider } from "../components/FeaturedMediaSliders";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import { LazyLoadingMediaSlider } from "../components/LazyLoadingMediaSlider";
import { useFetchGenresList } from "../hooks/useFetchGenresList";
import { MovieListLazyLoadingSliders } from "../components/MovieListLazyLoadingSliders";
import { TVListLazyLoadingSliders } from "../components/TVListLazyLoadingSliders";
import { fetchCollectionByList } from "../services/list.services";
import { fetchCollectionByGenre } from "../services/genres.services";

export const Explore = () => {
  const { media_type } = useParams();

  // Custom hooks
  const trendingQuery = useFetchTrendingMedia(media_type);
  const genresQuery = useFetchGenresList(media_type);

  // Display genre slides
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

        <LazyLoadingMediaSlider //Media sliders with lazy loading
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
          <MovieListLazyLoadingSliders
            fetchCollectionByListEvent={fetchCollectionByList}
          />
        )}

        {media_type === "tv" && (
          <TVListLazyLoadingSliders
            fetchCollectionByListEvent={fetchCollectionByList}
          />
        )}

        {genresMap}
      </div>
    </MainWrapper>
  );
};
