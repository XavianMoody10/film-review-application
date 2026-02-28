import { useParams } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { useFetchMediaDetails } from "../hooks/useFetchMediaDetails";
import { useFetchMediaCredits } from "../hooks/useFetchMediaCredits";
import { useFetchMediaImages } from "../hooks/useFetchMediaImages";
import { useFetchMediaReviews } from "../hooks/useFetchMediaReviews";
import { PageLoadingOverlay } from "../components/PageLoadingOverlay";
import { MediaLoadingOverlay } from "../components/MediaLoadingOverlay";
import { MediaErrorMessageOverlay } from "../components/MediaErrorMessageOverlay";
import { MediaCastSlider } from "../components/MediaCastSlider";
import { MediaGallerySlider } from "../components/MediaGallerySlider";
import { MediaReviewForm } from "../components/MediaReviewForm";
import { MediaReviewsGrid } from "../components/MediaReviewsGrid";

export const Details = () => {
  const { mediaType, mediaId } = useParams();

  // Custom Hooks
  const detailsQuery = useFetchMediaDetails(mediaType, mediaId);
  const creditsQuery = useFetchMediaCredits(mediaType, mediaId);
  const imagesQuery = useFetchMediaImages(mediaType, mediaId);
  const reviewsQuery = useFetchMediaReviews(mediaType, mediaId);

  const title = detailsQuery.data?.title;
  const original_title = detailsQuery.data?.original_title;
  const original_name = detailsQuery.data?.original_name;
  const overview = detailsQuery.data?.overview;
  const posterPath = `https://image.tmdb.org/t/p/original${detailsQuery.data?.poster_path}`;

  return (
    <>
      <header className=" fixed top-0 w-full px-3 py-2 z-20">
        <Hamburger color="white" size={20} />
      </header>

      <PageLoadingOverlay isLoading={detailsQuery.isLoading} />

      <main className="bg-linear-to-b from-black to-gray-900 min-h-screen flex flex-col items-center justify-center py-10">
        <div className=" w-full flex flex-col items-center justify-center gap-10 p-5 lg:flex-row lg:gap-40 lg:items-start">
          <div className=" lg:sticky lg:top-5">
            <div className=" w-full max-w-87.5 lg:w-125">
              <img
                src={posterPath}
                alt={title || original_name || original_title}
                className=" w-full"
              />
            </div>
          </div>

          <div className=" w-full lg:min-w-100 lg:max-w-200">
            <div className=" space-y-12">
              <h1 className=" text-white text-3xl font-bold tracking-wider xl:text-5xl">
                {title || original_name || original_title}
              </h1>

              <div className=" space-y-14">
                <div className=" space-y-5">
                  <h2 className=" text-white/45 text-4xl font-bold">
                    Overview
                  </h2>
                  <p className=" text-white tracking-widest leading-7">
                    {overview}
                  </p>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">Cast</h2>

                  <div className=" relative min-h-50">
                    {creditsQuery.isLoading && <MediaLoadingOverlay />}

                    {creditsQuery.isError && (
                      <MediaErrorMessageOverlay
                        message={creditsQuery.error.message}
                      />
                    )}

                    {creditsQuery.isSuccess && (
                      <MediaCastSlider cast={creditsQuery.data.cast} />
                    )}
                  </div>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">Gallery</h2>

                  <div className=" relative min-h-50">
                    {imagesQuery.isLoading && <MediaLoadingOverlay />}

                    {imagesQuery.isError && (
                      <MediaErrorMessageOverlay
                        message={imagesQuery.error.message}
                      />
                    )}

                    {imagesQuery.isSuccess && (
                      <MediaGallerySlider
                        backdrops={imagesQuery.data.backdrops}
                      />
                    )}
                  </div>
                </div>

                <div className=" space-y-5 w-full">
                  <h2 className=" text-white/45 text-4xl font-bold">
                    Your Review
                  </h2>

                  <div className=" relative min-h-50">
                    <MediaReviewForm
                      mediaTitle={title || original_name || original_title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full mt-10 px-10 space-y-10">
          <h2 className=" text-white/45 text-4xl font-bold">Reviews</h2>

          <div className=" relative min-h-25">
            {reviewsQuery.isLoading && <MediaLoadingOverlay />}

            {reviewsQuery.isError && <MediaErrorMessageOverlay />}

            {reviewsQuery.isSuccess && (
              <MediaReviewsGrid reviews={reviewsQuery.data} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
