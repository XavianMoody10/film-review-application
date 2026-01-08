import { Link } from "react-router-dom";
import { MediaBackdropSlider } from "../components/MediaBackdropSlider";
import { MediaSliderErrorMessageOverlay } from "../components/MediaSliderErrorMessageOverlay";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { useFetchTrendingMediaCollection } from "../hooks/useFetchTrendingMedia";
import { MediaPosterSlider } from "../components/MediaPosterSlider";
import { useFetchTVCollectionByList } from "../hooks/useFetchTVCollectionByList";

export const TV = () => {
  const trendingTV = useFetchTrendingMediaCollection("tv");

  return (
    <>
      <main className=" min-h-screen bg-[#F5F5F5] pt-24">
        <div className=" max-w-400 mx-auto w-[95%] space-y-14">
          <section>
            <div className=" bg-white w-full relative min-h-[90vh]">
              <MediaSliderLoadingOverlay isLoading={trendingTV.isLoading} />

              {trendingTV.isSuccess && (
                <MediaBackdropSlider results={trendingTV.data?.results} />
              )}

              {trendingTV.isError && <MediaSliderErrorMessageOverlay />}
            </div>
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/airing_today"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Airing Today
              </h2>
            </Link>

            <MediaPosterSlider
              event={useFetchTVCollectionByList}
              listValue={"airing_today"}
            />
          </section>

          <section className=" space-y-7">
            <Link
              to={"/movies/collection/on_the_air"}
              className=" w-fit block hover:underline"
            >
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                On The Air
              </h2>
            </Link>

            <MediaPosterSlider
              event={useFetchTVCollectionByList}
              listValue={"on_the_air"}
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
              event={useFetchTVCollectionByList}
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
              event={useFetchTVCollectionByList}
              listValue={"top_rated"}
            />
          </section>
        </div>
      </main>
    </>
  );
};
