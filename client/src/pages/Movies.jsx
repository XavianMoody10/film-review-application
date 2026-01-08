import { useQuery } from "@tanstack/react-query";
import { getMovieCollectionByList } from "../services/movies.services";
import { MediaBackdropSlider } from "../components/MediaBackdropSlider";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { MediaSliderErrorMessageOverlay } from "../components/MediaSliderErrorMessageOverlay";
import { useFetchMoviesCollectionByList } from "../hooks/useFetchMoviesCollectionByList";

export const Movies = () => {
  const nowPlayingQuery = useFetchMoviesCollectionByList("now_playing");

  return (
    <>
      <main className=" min-h-screen bg-[#F5F5F5]">
        <section>
          <div className=" bg-white w-full max-w-400 mx-auto relative min-h-[90vh] border border-gray-200">
            <MediaSliderLoadingOverlay isLoading={nowPlayingQuery.isLoading} />

            {nowPlayingQuery.isSuccess && (
              <MediaBackdropSlider results={nowPlayingQuery.data?.results} />
            )}

            {nowPlayingQuery.isError && <MediaSliderErrorMessageOverlay />}
          </div>
        </section>
      </main>
    </>
  );
};
