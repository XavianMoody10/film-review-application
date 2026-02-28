export const MediaReviewForm = ({ mediaTitle }) => {
  return (
    <form
      method="post"
      className=" w-full"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <textarea
        name="review"
        id="review"
        rows={10}
        placeholder={`What did you think of ${mediaTitle || "the masterpiece"}?`}
        className=" border border-white w-full text-white p-5"
      />

      <button className=" border w-full text-white font-semibold py-3 hover:bg-white hover:text-black duration-150 tracking-wider">
        Submit Review
      </button>
    </form>
  );
};
