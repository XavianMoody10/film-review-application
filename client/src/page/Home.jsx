import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { TrendingMediaSlider } from "../components/TrendingMediaSlider";
import { AnimatePresence, motion } from "motion/react";

export const Home = () => {
  // Fetching all trending media
  async function fetchTrendingData() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/trending/all`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw Error("Error getting collection");
    }
  }

  const query = useQuery({
    queryKey: ["trending-all"],
    queryFn: fetchTrendingData,
    staleTime: 0,
    retry: false,
  });

  return (
    <main className="bg-linear-to-b from-black to-gray-900 h-screen">
      <div className=" relative">
        <AnimatePresence>
          {query.isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: query.isLoading ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className=" fixed top-0 h-screen w-full flex items-center justify-center bg-black z-20"
            >
              <ClipLoader color="white" />
            </motion.div>
          )}
        </AnimatePresence>

        {query.isError && (
          <div className=" fixed top-0 h-screen w-full flex flex-col items-center justify-center gap-5 bg-black z-10 text-white">
            <span className=" text-4xl text-center font-extralight tracking-wider">
              {query.error.message}
            </span>
            <ErrorIcon size={50} />
          </div>
        )}

        <TrendingMediaSlider results={query.data?.results} height={"100vh"} />
      </div>
    </main>
  );
};
