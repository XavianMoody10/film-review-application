import { useMutation } from "@tanstack/react-query";
import { postReview } from "../services/reviews.services";

export const usePostMediaReview = (
  media_type,
  media_id,
  onSuccess,
  onError,
) => {
  const mutation = useMutation({
    mutationFn: (postObj) => postReview(media_type, media_id, postObj),
    onSuccess,
    onError,
  });

  return mutation;
};
