import { FaStar as RatingIcon } from "react-icons/fa6";

export const ReviewCard = ({ reviewer, rating, review }) => {
  return (
    <div className=" bg-transparent rounded-md space-y-3">
      <div className=" border-b border-b-gray-200 pb-2 flex items-center justify-between">
        <span className=" text-2xl tracking-wider font-bold text-white">
          {reviewer}
        </span>

        <div className=" flex gap-2">
          <span className=" text-xl text-white">{rating}</span>
          <RatingIcon size={25} color="white" />
        </div>
      </div>

      <p className=" tracking-wider text-white">{review}</p>
    </div>
  );
};
