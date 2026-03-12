import { Link, useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadMediaPoster } from "../components/LazyLoadMediaPoster";

async function fetchCollectionByList(media_type, list_value) {
  const url = `http://localhost:3000/list/${media_type}/${list_value}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  if (!list_value) {
    throw new Error("'list_value' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const ListCollection = () => {
  const { media_type, list_value } = useParams();

  const query = useQuery({
    queryKey: ["list", { media_type, list_value: "now_playing" }],
    queryFn: () => fetchCollectionByList(media_type, list_value),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // Revalidate in 10 minutes
  });

  const posters = query.data?.results.map(({ id, poster_path }) => {
    const poster = `https://image.tmdb.org/t/p/original${poster_path}`;

    return (
      <Link key={id} to={`/details/${media_type}/${id}`}>
        {/* <div key={id}>
          <img src={poster} alt="" className=" w-full" />
        </div> */}
        <LazyLoadMediaPoster poster_path={poster_path}></LazyLoadMediaPoster>
      </Link>
    );
  });

  return (
    <MainWrapper>
      <div className=" px-10 pt-28 pb-10">
        <div className=" grid gap-5 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {posters}
        </div>
      </div>
    </MainWrapper>
  );
};
