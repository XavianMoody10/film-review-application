import { MainWrapper } from "../components/MainWrapper";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FullPageLoadingOverlay } from "../components/FullPageLoadingOverlay";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { useFetchMediaDetails } from "../hooks/useFetchMediaDetails";
import { useFetchMediaReviews } from "../hooks/useFetchMediaReviews";
import { FullPageActionLoadingOverlay } from "../components/FullPageActionLoadingOverlay";
import { PageActionErrorMessage } from "../components/PageActionErrorMessage";
import { PageActionSuccessMessage } from "../components/PageActionSuccessMessage";
import { MediaReviewForm } from "../components/MediaReviewForm";
import { ReviewsGrid } from "../components/ReviewsGrid";

export const Details = () => {
  const { media_type, media_id } = useParams();

  // State hooks
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    isOpen: false,
  });
  const [successMessage, setSuccessMessage] = useState({
    message: "",
    isOpen: false,
  });

  // Custom hooks
  const query = useFetchMediaDetails(media_type, media_id);
  const reviewsQuery = useFetchMediaReviews(media_type, media_id);

  // Media details declerations
  const backdrop = `https://image.tmdb.org/t/p/original${query.data?.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/original${query.data?.poster_path}`;
  const title =
    query.data?.title ||
    query.data?.original_title ||
    query.data?.original_name;
  const overview = query.data?.overview;

  return (
    <>
      <FullPageActionLoadingOverlay />
      <FullPageLoadingOverlay isLoading={query.isLoading} />
      <PageActionErrorMessage
        isOpen={errorMessage.isOpen}
        errorMessage={errorMessage.message}
      />
      <PageActionSuccessMessage
        isOpen={successMessage.isOpen}
        successMessage={successMessage.message}
      />

      <MainWrapper>
        <div className=" max-w-300 mx-auto px-10 pt-20 pb-10 space-y-20 relative">
          <div
            className=" h-150 bg-top bg-cover relative hidden lg:block"
            style={{
              backgroundImage: `url(${backdrop})`,
            }}
          />

          <div className=" mx-auto flex flex-col items-center gap-4 max-w-200 sm:flex-row sm:items-start lg:max-w-300 lg:gap-14">
            <img
              src={poster}
              alt={title}
              className=" w-full max-w-50 sm:max-w-62.5 lg:max-w-75"
            />
            <ul className=" space-y-5">
              <li>
                <h1 className=" text-center text-white text-2xl font-urbanist tracking-wider sm:text-start lg:text-4xl">
                  {title}
                </h1>
              </li>

              <li>
                <p className=" text-center text-white font-urbanist tracking-wider sm:text-start lg:text-lg">
                  {overview}
                </p>
              </li>
            </ul>
          </div>

          <div className=" space-y-20">
            {reviewsQuery.isSuccess && (
              <div className=" max-w-125">
                <MediaReviewForm
                  setErrorMessage={setErrorMessage}
                  setSuccessMessage={setSuccessMessage}
                  media_type={media_type}
                  media_id={media_id}
                />
              </div>
            )}

            <div className=" relative">
              <LoadingOverlay isLoading={reviewsQuery.isLoading} />
              <ReviewsGrid reviews={reviewsQuery.data} />
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};
