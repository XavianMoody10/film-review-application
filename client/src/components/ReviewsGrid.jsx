import { ReviewCard } from "./ReviewCard";

export const ReviewsGrid = ({ reviews }) => {
  // Display reviews
  const reviewsMap = reviews
    ?.reverse()
    ?.map(({ _id, title, review, rating }) => {
      return (
        <ReviewCard
          key={_id}
          _id={_id}
          title={title}
          review={review}
          rating={rating}
        />
      );
    });

  return (
    <>
      {reviews?.length === 0 ? (
        <div className=" text-white font-urbanist text-lg text-center tracking-widest border border-white/20 h-25 flex items-center justify-center">
          No Reviews
        </div>
      ) : (
        <div className=" grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviewsMap}
        </div>
      )}
    </>
  );
};
