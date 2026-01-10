import React from "react";

export const ReviewForm = ({
  getTitleEvent,
  getReviewEvent,
  onSubmitEvent,
  isButtonDisabled,
}) => {
  return (
    <form className=" w-full space-y-2" onSubmit={onSubmitEvent}>
      <input
        type="text"
        className=" border border-gray-200 w-full p-2 outline-none"
        placeholder="Title"
        maxLength={40}
        onChange={getTitleEvent}
      />
      <textarea
        name="review"
        id="review"
        rows={10}
        className=" border border-gray-200 w-full p-2 outline-none resize-none"
        placeholder="What are your thoughts on this film?"
        onChange={getReviewEvent}
        maxLength={1000}
      ></textarea>

      <button
        disabled={isButtonDisabled}
        className=" font-geologica tracking-wider w-full text-center border border-gray-200 py-3 hover:bg-black hover:text-white duration-150 rounded-sm font-medium"
      >
        Add Review
      </button>
    </form>
  );
};
