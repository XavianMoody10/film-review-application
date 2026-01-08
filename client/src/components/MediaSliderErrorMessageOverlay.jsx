import { MdErrorOutline as ErrorIcon } from "react-icons/md";

export const MediaSliderErrorMessageOverlay = () => {
  return (
    <div className=" absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-1 text-red-500 text-3xl font-inter font-extrabold">
      Error getting data
      <ErrorIcon size={70} />
    </div>
  );
};
