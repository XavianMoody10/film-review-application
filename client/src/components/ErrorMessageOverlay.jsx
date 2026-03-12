import { ShieldAlert as ErrorIcon } from "lucide-react";

export const ErrorMessageOverlay = ({ erorrMessage }) => {
  return (
    <>
      {erorrMessage && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-full flex flex-wrap items-center justify-center gap-2 bg-black z-10">
          <span className=" text-white font-urbanist tracking-wider text-center text-lg">
            {erorrMessage}
          </span>
          <ErrorIcon color="white" size={35} />
        </div>
      )}
    </>
  );
};
