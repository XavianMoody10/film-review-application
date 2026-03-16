import { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useQueryClient } from "@tanstack/react-query";
import { usePostMediaReview } from "../hooks/usePostMediaReview";
import { ActionLoadingContext } from "../contexts/ActionLoadingContext";

export const MediaReviewForm = ({
  media_type,
  media_id,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [rateValue, setRateValue] = useState(0);
  const [titleValue, setTitleValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const queryClient = useQueryClient();
  const actionLoadingContext = useContext(ActionLoadingContext);
  const mutation = usePostMediaReview(media_type, media_id, onSuccess, onError);

  // Success event for when mutaion is successful
  function onSuccess(data) {
    actionLoadingContext.setIsLoading(false);

    queryClient.setQueryData(["reviews", { media_type, media_id }], (prev) => {
      return [...prev, data.at(-1)];
    });

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
  }

  // Error event for when mutaion has error
  function onError(error) {
    actionLoadingContext.setIsLoading(false);

    setErrorMessage((prev) => {
      return { isOpen: true, message: error.message };
    });
  }

  return (
    <div className=" flex flex-col w-full space-y-3">
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
        emptyIcon={<StarBorderIcon sx={{ color: "white", fontSize: 30 }} />}
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
          actionLoadingContext.setIsLoading(true);

          mutation.mutate({
            title: titleValue,
            review: reviewValue,
            rating: rateValue,
          });
        }}
        className=" border border-white/20 text-white font-urbanist tracking-wider font-medium py-3 hover:bg-white hover:text-black duration-150"
      >
        Submit Review
      </button>
    </div>
  );
};
