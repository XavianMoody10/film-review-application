import { useQuery } from "@tanstack/react-query";
import { getMovieCollectionByList } from "../services/movies.services";
import { MediaBackdropSlider } from "../components/MediaBackdropSlider";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { MediaSliderErrorMessageOverlay } from "../components/MediaSliderErrorMessageOverlay";
import { useFetchMoviesCollectionByList } from "../hooks/useFetchMoviesCollectionByList";
import { MediaPosterSlider } from "../components/MediaPosterSlider";
import { Link } from "react-router-dom";

export const Movies = () => {
  const nowPlayingQuery = useFetchMoviesCollectionByList("now_playing");

  return (
    <>
      <main className=" min-h-screen bg-[#F5F5F5]">
        <div className=" max-w-400 mx-auto w-[95%] space-y-14">
          <section>
            <div className=" bg-white w-full relative min-h-[90vh]">
              <MediaSliderLoadingOverlay
                isLoading={nowPlayingQuery.isLoading}
              />

              {nowPlayingQuery.isSuccess && (
                <MediaBackdropSlider results={nowPlayingQuery.data?.results} />
              )}

              {nowPlayingQuery.isError && <MediaSliderErrorMessageOverlay />}
            </div>
          </section>

          <section className=" space-y-7">
            <Link to={"/movies/collection/popular"} className=" block">
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Popular Movies
              </h2>
            </Link>

            <MediaPosterSlider />
          </section>
        </div>
      </main>
    </>
  );
};
