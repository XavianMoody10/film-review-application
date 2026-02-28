import { ReviewCard } from "./ReviewCard";

export const MediaReviewsGrid = ({ reviews }) => {
  // Display reviews to UI
  const reviewsMap = reviews?.map(({ id, rating, review, reviewer }) => {
    return (
      <ReviewCard
        key={id}
        rating={rating}
        review={review}
        reviewer={reviewer}
      />
    );
  });

  return (
    <>
      {reviews.length === 0 && (
        <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
          <span className=" text-2xl text-center font-extralight tracking-wider">
            No Reviews
          </span>
        </div>
      )}

      <div className=" grid gap-x-10 gap-y-20 min-[800px]:grid-cols-2 xl:grid-cols-3">
        {reviewsMap}
      </div>
    </>
  );
};
