import { useLocation, useParams } from "react-router-dom";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { useEffect, useState } from "react";
import { ReviewsSlider } from "../components/ReviewsSlider";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { ClipLoader } from "react-spinners";
import { useFetchMediaDetails } from "../hooks/useFetchMediaDetails";
import { useFetchMediaReviews } from "../hooks/useFetchMediaReviews";
import { usePostMediaReview } from "../hooks/usePostMediaReview";
import { PageSuccessMessage } from "../components/PageSuccessMessage";
import { PageErrorMessage } from "../components/PageErrorMessage";
import { NoReviewsMessage } from "../components/NoReviewsMessage";
import { MediaReviewsSliderErrorMessage } from "../components/MediaReviewsSliderErrorMessage";
import { ReviewForm } from "../components/ReviewForm";

export const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const [formTitle, setFormTitle] = useState("");
  const [formReview, setFormReview] = useState("");
  const detailsQuery = useFetchMediaDetails(media, id);
  const reviewsQuery = useFetchMediaReviews(media, id);
  const { mutation, successMessage, errorMessage } = usePostMediaReview(
    media,
    id,
    {
      title: formTitle,
      review: formReview,
      rating: 3.5,
    }
  );

  const data = detailsQuery.data;
  const poster = `https://image.tmdb.org/t/p/original${data?.poster_path}`;
  const title = data?.original_title;
  const overview = data?.overview;

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {mutation.isPending && (
        <div className=" fixed top-0 left-0 bottom-0 right-0 bg-black/15 z-30 flex items-center justify-center">
          <ClipLoader size={30} color="white" />
        </div>
      )}

      {successMessage.isOpen && (
        <PageSuccessMessage message={successMessage.message} />
      )}

      {errorMessage.isOpen && (
        <PageErrorMessage message={errorMessage.message} />
      )}

      <main className=" min-h-screen bg-[#F5F5F5] pt-28 p-5">
        {detailsQuery.isSuccess && (
          <>
            <div className=" w-full max-w-325 mx-auto space-y-20">
              <section className=" min-h-100 relative">
                <div className=" flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
                  <div className=" w-full max-w-100 lg:min-w-100">
                    <img src={poster} alt={title} className=" w-full" />
                  </div>

                  <div className=" flex flex-col items-center gap-4 lg:items-start">
                    <h1 className=" text-2xl font-inter font-extrabold tracking-wider sm:text-3xl">
                      {title}
                    </h1>

                    <p className=" font-inter leading-7">{overview}</p>
                  </div>
                </div>
              </section>

              <section className=" space-y-4">
                <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                  Reviews
                </h2>

                <div className=" min-h-62.5 relative">
                  {reviewsQuery.isSuccess && (
                    <ReviewsSlider reviews={reviewsQuery.data} />
                  )}

                  <MediaSliderLoadingOverlay
                    isLoading={reviewsQuery.isLoading}
                  />

                  {reviewsQuery.data?.length === 0 && <NoReviewsMessage />}

                  {reviewsQuery.isError && <MediaReviewsSliderErrorMessage />}
                </div>
              </section>

              <section className=" space-y-4">
                <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                  Leave a review
                </h2>

                <div className=" max-w-125">
                  <ReviewForm
                    getTitleEvent={(e) => setFormTitle(e.target.value)}
                    getReviewEvent={(e) => setFormReview(e.target.value)}
                    onSubmitEvent={(e) => {
                      e.preventDefault();
                      mutation.mutate();
                    }}
                    isButtonDisabled={reviewsQuery.isLoading}
                  ></ReviewForm>
                </div>
              </section>
            </div>
          </>
        )}

        {detailsQuery.isError && (
          <div className=" absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className=" bg-white absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-1 text-red-500 text-3xl font-inter font-extrabold">
              Error getting details
              <ErrorIcon size={70} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};
