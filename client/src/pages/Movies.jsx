import { MediaBackdropSlider } from "../components/MediaBackdropSlider";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { MediaSliderErrorMessageOverlay } from "../components/MediaSliderErrorMessageOverlay";
import { useFetchMoviesCollectionByList } from "../hooks/useFetchMoviesCollectionByList";
import { MediaPosterSlider } from "../components/MediaPosterSlider";
import { Link } from "react-router-dom";
import { useFetchTrendingMediaCollection } from "../hooks/useFetchTrendingMedia";

export const Movies = () => {
  const trendingMovies = useFetchTrendingMediaCollection("movies");

  return (
    <>
      <main className=" min-h-screen bg-[#F5F5F5] pt-24">
        <div className=" max-w-400 mx-auto w-[95%] space-y-14">
          <section>
            <div className=" bg-white w-full relative min-h-[90vh]">
              <MediaSliderLoadingOverlay isLoading={trendingMovies.isLoading} />

              {trendingMovies.isSuccess && (
                <MediaBackdropSlider results={trendingMovies.data?.results} />
              )}

              {trendingMovies.isError && <MediaSliderErrorMessageOverlay />}
            </div>
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/now_playing"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Now Playing
              </h2>
            </Link>

            <MediaPosterSlider
              media={"movies"}
              event={useFetchMoviesCollectionByList}
              listValue={"now_playing"}
            />
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/popular"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Popular
              </h2>
            </Link>

            <MediaPosterSlider
              media={"movies"}
              event={useFetchMoviesCollectionByList}
              listValue={"popular"}
            />
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/top_rated"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Top Rated
              </h2>
            </Link>

            <MediaPosterSlider
              media={"movies"}
              event={useFetchMoviesCollectionByList}
              listValue={"top_rated"}
            />
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/upcoming"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Upcoming
              </h2>
            </Link>

            <MediaPosterSlider
              media={"movies"}
              event={useFetchMoviesCollectionByList}
              listValue={"upcoming"}
            />
          </section>
        </div>
      </main>
    </>
  );
};
