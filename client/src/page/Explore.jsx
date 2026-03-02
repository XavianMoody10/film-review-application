import { MediaBackdropSlider } from "../components/MediaBackdropSlider";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Explore = () => {
  const { mediaType } = useParams();

  async function fetchGenres() {
    const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/genres/${mediaType}`;

    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error getting genres");
    }
  }

  const genresQuery = useQuery({
    queryKey: ["genres", mediaType],
    queryFn: fetchGenres,
    staleTime: 300000, // 5 minutes
  });

  const genresSlidersMap = genresQuery.data?.genres?.map(({ id, name }) => {
    const endpoint = `${import.meta.env.VITE_SERVER_ENDPOINT}/discover/${mediaType}/${id}/1`;

    return (
      <div className=" space-y-3" key={id}>
        <div className=" flex items-center justify-between">
          <h2 className=" text-2xl text-white font-extralight tracking-wider">
            {name}
          </h2>

          <Link
            to={`/collection/${mediaType}/${id}`}
            className=" block text-white tracking-wider hover:underline"
          >
            View All
          </Link>
        </div>

        <MediaBackdropSlider
          key={id}
          queryKey={["genre", id, mediaType, 1]}
          endpoint={endpoint}
          mediaType={mediaType}
        />
      </div>
    );
  });

  return (
    <main className="bg-linear-to-b from-black to-gray-900 min-h-screen py-20 px-7">
      <div className=" space-y-10">{genresSlidersMap}</div>
    </main>
  );
};
