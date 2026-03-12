import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

export const GenreCollection = () => {
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
      <div>
        <img src={poster} alt="" />
      </div>
    );
  });

  return <div>GenreCollection</div>;
};
