import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMediaDetails } from "../services/details.services";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { getMediaReviews, postMediaReview } from "../services/reviews.services";
import { ReviewsSlider } from "../components/ReviewsSlider";
import { MediaSliderLoadingOverlay } from "../components/MediaSliderLoadingOverlay";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";

export const Details = () => {
  const [successMessage, setSuccessMessage] = useState({
    isOpen: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    isOpen: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const { id } = useParams();
  const textAreaRef = useRef(null);
  const titleInputRef = useRef(null);

  const detailsQuery = useQuery({
    queryKey: [media, id],
    queryFn: () => getMediaDetails(media, id),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", media, id],
    queryFn: () => getMediaReviews(media, id),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: () =>
      postMediaReview(
        {
          title: titleInputRef.current.value,
          review: textAreaRef.current.value,
          rating: 3.5,
        },
        media,
        id
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["reviews", media, id], data);
      setSuccessMessage({ isOpen: true, message: "Review succesfully added" });
    },
    onError: (error) => {
      setErrorMessage({ isOpen: true, message: error.message });
    },
    onSettled: () => {
      if (successMessage.isOpen) {
        setTimeout(
          () =>
            setSuccessMessage({
              isOpen: false,
              message: "",
            }),
          5000
        );
      }

      if (errorMessage.isOpen) {
        setTimeout(
          () =>
            setErrorMessage({
              isOpen: false,
              message: "",
            }),
          5000
        );
      }
    },
  });

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
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ stiffness: 0 }}
          className=" fixed top-0 w-full z-40 bg-green-500 flex justify-center text-lg text-white font-semibold py-3"
        >
          {successMessage.message}
        </motion.div>
      )}

      {errorMessage.isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ stiffness: 0 }}
          className=" fixed top-0 w-full z-40 bg-red-500 flex justify-center text-lg text-white font-semibold py-3"
        >
          {errorMessage.message}
        </motion.div>
      )}

      <main className=" min-h-screen bg-[#F5F5F5] pt-28 p-5">
        {detailsQuery.isSuccess && (
          <>
            <div className=" w-full max-w-325 mx-auto space-y-20">
              <section>
                <div className=" flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
                  <div className=" w-full max-w-100 lg:min-w-100">
                    <img src={poster} alt="" className=" w-full" />
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

                  {reviewsQuery.data?.length === 0 && (
                    <div className=" font-inter font-medium min-h-62.5 border border-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                      No Reviews
                    </div>
                  )}

                  {reviewsQuery.isError && (
                    <div className=" font-inter font-medium min-h-62.5 border border-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                      Error getting reviews
                    </div>
                  )}
                </div>
              </section>

              <section className=" space-y-4">
                <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                  Leave a review
                </h2>

                <form
                  className=" max-w-125 space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
                  }}
                >
                  <input
                    type="text"
                    className=" border border-gray-200 w-full p-2 outline-none"
                    placeholder="Title"
                    maxLength={40}
                    ref={titleInputRef}
                  />
                  <textarea
                    name="review"
                    id="review"
                    rows={10}
                    className=" border border-gray-200 w-full p-2 outline-none resize-none"
                    placeholder="What are your thoughts on this film?"
                    ref={textAreaRef}
                    maxLength={1000}
                  ></textarea>

                  <button
                    disabled={reviewsQuery.isLoading}
                    className=" font-geologica tracking-wider w-full text-center border border-gray-200 py-3 hover:bg-black hover:text-white duration-150 rounded-sm font-medium"
                  >
                    Add Review
                  </button>
                </form>
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
