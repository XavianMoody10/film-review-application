import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MainWrapper } from "../components/MainWrapper";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { ShieldAlert as ErrorIcon } from "lucide-react";
import { Check as SuccessIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ClipLoader } from "react-spinners";
import { FullPageLoadingOverlay } from "../components/FullPageLoadingOverlay";
import { LoadingOverlay } from "../components/LoadingOverlay";

async function fetchMediaDetails(media_type, series_id, movie_id) {
  const url = `http://localhost:3000/details/${media_type}`;

  try {
    const response = await axios.get(url, { params: { series_id, movie_id } });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function fetchMediaReviews(media_type, media_id) {
  const url = `http://localhost:3000/reviews/${media_type}/${media_id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

async function postReview(media_type, media_id, postObj) {
  const { title, review, rating } = postObj;

  const url = `http://localhost:3000/reviews/create/${media_type}/${media_id}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!media_id) {
    throw new Error("'media_id' is required");
  }

  if (!title) {
    throw new Error("Please add a title");
  }

  if (!review) {
    throw new Error("Please add a review");
  }

  if (!rating) {
    throw new Error("Rating needs to be 1 or higher");
  }

  try {
    const response = await axios.post(url, postObj);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const Details = () => {
  const { media_type, media_id } = useParams();
  const [rateValue, setRateValue] = useState(0);
  const [titleValue, setTitleValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    isOpen: false,
  });
  const [successMessage, setSuccessMessage] = useState({
    message: "",
    isOpen: false,
  });
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["details", { media_type, media_id }],
    queryFn: () =>
      fetchMediaDetails(
        media_type,
        media_type === "tv" ? media_id : null,
        media_type === "movie" ? media_id : null,
      ),
    staleTime: 0,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", { media_type, media_id }],
    queryFn: () => fetchMediaReviews(media_type, media_id),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (postObj) => postReview(media_type, media_id, postObj),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["reviews", { media_type, media_id }],
        (prev) => {
          return [...prev, data.at(-1)];
        },
      );

      setSuccessMessage({
        message: "Review was successfully posted",
        isOpen: true,
      });

      setTimeout(
        () =>
          setSuccessMessage((prev) => {
            return { ...prev, isOpen: false };
          }),
        5000,
      );

      setTitleValue("");
      setReviewValue("");
      setRateValue(0);
    },
    onError: (error) => {
      setErrorMessage((prev) => {
        return { isOpen: true, message: error.message };
      });
    },
  });

  const reviews = reviewsQuery.data
    ?.reverse()
    ?.map(({ _id, title, review, rating }) => {
      return (
        <div
          key={_id}
          className=" border border-white/20 h-50 p-2 flex flex-col justify-between"
        >
          <div className=" border border-white/20 text-white text-lg font-urbanist tracking-widest p-2">
            {title}
          </div>
          <p className=" text-gray-300 text-lg font-urbanist overflow-y-auto h-full">
            {review}
          </p>
          <div className=" text-white font-urbanist flex items-center gap-1">
            <span>{rating}</span>
            <StarIcon />
          </div>
        </div>
      );
    });

  const backdrop = `https://image.tmdb.org/t/p/original${query.data?.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/original${query.data?.poster_path}`;
  const title = query.data?.title || query.data?.original_title;
  const overview = query.data?.overview;

  return (
    <>
      <AnimatePresence>
        {mutation.isPending && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: mutation.isPending ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className=" fixed top-0 left-0 right-0 bottom-0 bg-black/25 h-screen flex items-center justify-center z-30"
          >
            <ClipLoader size={30} color="white" />
          </motion.div>
        )}
      </AnimatePresence>

      <FullPageLoadingOverlay isLoading={query.isLoading} />

      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: errorMessage.isOpen ? 0 : "-100%" }}
        transition={{ stiffness: 0 }}
        className=" fixed top-0 w-full bg-red-600 z-40 py-2 flex items-center justify-center gap-1"
      >
        <span className=" font-urbanist font-semibold text-lg text-white tracking-wider">
          {errorMessage.message}
        </span>
        <ErrorIcon color="white" />
      </motion.div>

      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: successMessage.isOpen ? 0 : "-100%" }}
        transition={{ stiffness: 0 }}
        className=" fixed top-0 w-full bg-green-600 z-40 py-2 flex items-center justify-center gap-1"
      >
        <span className=" font-urbanist font-semibold text-lg text-white tracking-wider">
          {successMessage.message}
        </span>
        <SuccessIcon color="white" />
      </motion.div>

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
            <div className=" flex flex-col w-full max-w-125 space-y-3">
              <input
                type="text"
                placeholder="Title"
                className=" text-white border border-white/20 p-3"
                value={titleValue}
                onChange={(e) => {
                  mutation.reset();
                  setErrorMessage((prev) => {
                    return { ...prev, isOpen: false };
                  });
                  setTitleValue(e.target.value);
                }}
              />

              <textarea
                name="review"
                id="review"
                rows={10}
                placeholder="What are your thought?"
                className=" text-white resize-none border border-white/20 p-3"
                value={reviewValue}
                onChange={(e) => {
                  mutation.reset();
                  setErrorMessage((prev) => {
                    return { ...prev, isOpen: false };
                  });
                  setReviewValue(e.target.value);
                }}
              />

              <Rating
                value={rateValue}
                emptyIcon={
                  <StarBorderIcon sx={{ color: "white", fontSize: 30 }} />
                }
                icon={<StarIcon sx={{ color: "white", fontSize: 30 }} />}
                onChange={(e, v) => {
                  mutation.reset();
                  setErrorMessage((prev) => {
                    return { ...prev, isOpen: false };
                  });
                  setRateValue(v);
                }}
              />

              <button
                onClick={() => {
                  mutation.mutate({
                    title: titleValue,
                    review: reviewValue,
                    rating: rateValue,
                  });
                }}
                disabled={reviewsQuery.isLoading}
                className=" border border-white/20 text-white font-urbanist tracking-wider font-medium py-3 hover:bg-white hover:text-black duration-150"
              >
                Submit Review
              </button>
            </div>

            <div className=" relative">
              <LoadingOverlay isLoading={reviewsQuery.isLoading} />

              {reviewsQuery.data?.length === 0 ? (
                <div className=" text-white font-urbanist text-lg text-center tracking-wider border border-white/20 h-[100px] flex items-center justify-center">
                  No Reviews
                </div>
              ) : (
                <div className=" grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {reviews}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};
