import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMediaDetails } from "../services/details.services";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { useEffect } from "react";

export const Details = () => {
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const { id } = useParams();

  const query = useQuery({
    queryKey: [media, id],
    queryFn: () => getMediaDetails(media, id),
    retry: false,
    staleTime: 15 * 60 * 1000,
  });

  const data = query.data;
  const poster = `https://image.tmdb.org/t/p/original${data?.poster_path}`;
  const title = data?.original_title;
  const overview = data?.overview;

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <main className=" min-h-screen bg-[#F5F5F5] pt-28 p-5">
      {query.isSuccess && (
        <>
          <div className=" w-full max-w-325 mx-auto space-y-20">
            <section>
              <div className=" flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
                <div className=" w-full max-w-100 lg:min-w-100">
                  <img src={poster} alt="" className=" w-full" />
                </div>

                <div className=" flex flex-col items-center gap-4 lg:items-start">
                  <h1 className=" text-2xl font-inter font-extrabold tracking-wider sm:text-3xl">
                    {title}
                  </h1>

                  <p className=" font-inter leading-7">{overview}</p>
                </div>
              </div>
            </section>

            <section className=" space-y-4">
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Leave a review
              </h2>

              <div className=" font-inter font-medium min-h-62.5 border border-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                No Reviews
              </div>
            </section>

            <section className=" space-y-4">
              <h2 className=" font-inter font-extrabold text-2xl sm:text-3xl">
                Reviews
              </h2>

              <form className=" max-w-125">
                <textarea
                  name="review"
                  id="review"
                  rows={10}
                  className=" border border-gray-200 w-full p-2 outline-none resize-none"
                  placeholder="What are your thoughts on this film?"
                ></textarea>

                <button className=" font-geologica tracking-wider w-full text-center border border-gray-200 py-3 hover:bg-black hover:text-white duration-150 rounded-sm font-medium">
                  Add Review
                </button>
              </form>
            </section>
          </div>
        </>
      )}

      {query.isError && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className=" bg-white absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-1 text-red-500 text-3xl font-inter font-extrabold">
            Error getting details
            <ErrorIcon size={70} />
          </div>
        </div>
      )}
    </main>
  );
};
