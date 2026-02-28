import { MdErrorOutline as ErrorIcon } from "react-icons/md";

export const MediaErrorMessageOverlay = ({ message }) => {
  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 w-full flex flex-col items-center justify-center gap-5 z-10 text-white">
      <span className=" text-2xl text-center font-extralight tracking-wider">
        {message}
      </span>
      <ErrorIcon size={50} />
    </div>
  );
};
