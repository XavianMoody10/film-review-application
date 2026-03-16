import StarIcon from "@mui/icons-material/Star";

export const ReviewCard = ({ _id, title, review, rating }) => {
  return (
    <div className=" border border-white/20 h-50 p-2 flex flex-col justify-between">
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
};
