import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postMediaReview } from "../services/reviews.services";

export const usePostMediaReview = (media, mediaId, formData) => {
  const [successMessage, setSuccessMessage] = useState({
    isOpen: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    isOpen: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      postMediaReview(
        // {
        //   title: titleInputRef.current.value,
        //   review: textAreaRef.current.value,
        //   rating: 3.5,
        // },
        formData,
        media,
        mediaId
      ),
    onSuccess: (data) => {
      queryClient.setQueryData(["reviews", media, mediaId], data);
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

  return { mutation, successMessage, errorMessage };
};
