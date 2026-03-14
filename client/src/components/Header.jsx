import { Search as SearchIcon } from "lucide-react";
import { Squash as Hamburger } from "hamburger-react";
import { useContext, useEffect, useState } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { LoadingOverlay } from "./LoadingOverlay";

async function fetchMediaBySearch(query) {
  const url = `http://localhost:3000/search/${query}`;

  if (!query) {
    throw new Error("'query' value is empty");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const Header = () => {
  const sideNavigationContext = useContext(SideNavigationContext);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  const searchQuery = useQuery({
    queryKey: ["search", { query }],
    queryFn: () => fetchMediaBySearch(query),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (debouncedQuery) {
      searchQuery.refetch();
    }
  }, [debouncedQuery]);

  const results = searchQuery.data?.results.map(
    ({ id, poster_path, title, original_name, original_title, media_type }) => {
      const poster = `https://image.tmdb.org/t/p/original${poster_path}`;

      if (poster_path) {
        return (
          <SwiperSlide key={id}>
            <div className=" flex flex-col items-center gap-4">
              <img
                src={poster}
                alt={title || original_name || original_title}
                className=" w-full max-w-50"
              />
              <Link
                to={`/details/${media_type}/${id}`}
                className=" block hover:underline"
                onClick={() => searchQuery("")}
              >
                <span className=" text-white font-urbanist tracking-wider">
                  {title || original_name}
                </span>
              </Link>
            </div>
          </SwiperSlide>
        );
      }
    },
  );

  return (
    <header className=" fixed top-0 w-full p-3 flex items-center justify-between z-30 bg-black">
      <div className=" w-full max-w-[320px]">
        <div
          className=" border border-white flex items-center justify-between gap-2 h-10 w-full pr-2"
          id="search-bar"
        >
          <input
            type="text"
            className=" w-full h-full text-white placeholder:text-white pl-2 outline-none"
            placeholder="Search movies, TV shows, and actors"
            onChange={(e) => setQuery(e.target.value)}
          />

          <SearchIcon color="white" size={20} />
        </div>
      </div>

      <Hamburger
        size={20}
        color="white"
        toggle={sideNavigationContext.setIsOpen}
        toggled={sideNavigationContext.isOpen}
      />

      {query && (
        <div className=" absolute left-3 top-20 w-[90%] min-h-75 max-w-300 border border-gray-200/25 bg-black/65 space-y-5">
          <LoadingOverlay isLoading={searchQuery.isLoading} />

          <X
            color="white"
            className=" ml-auto cursor-pointer absolute top-3 right-3"
            onClick={() => setQuery("")}
          />

          {searchQuery.isSuccess && (
            <>
              {searchQuery.data?.results.length === 0 ? (
                <div className=" text-white font-urbanist tracking-wider flex items-center min-h-[300px] justify-center">
                  No Results
                </div>
              ) : (
                <div className=" p-5">
                  <Swiper
                    slidesPerView={1.2}
                    breakpoints={{
                      500: {
                        slidesPerView: 1.8,
                      },
                      800: {
                        slidesPerView: 2.8,
                      },
                      1200: {
                        slidesPerView: 3.8,
                      },
                    }}
                  >
                    {results}
                  </Swiper>
                </div>
              )}
            </>
          )}

          {searchQuery.isError && (
            <div className=" text-white font-urbanist tracking-wider flex items-center min-h-[300px] justify-center">
              Error getting results
            </div>
          )}
        </div>
      )}
    </header>
  );
};
