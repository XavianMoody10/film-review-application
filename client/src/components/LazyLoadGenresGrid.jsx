import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingOverlay } from "./LoadingOverlay";
import { ErrorMessageOverlay } from "./ErrorMessageOverlay";
import { Link } from "react-router-dom";

async function fetchGenresList(media_type) {
  const url = `http://localhost:3000/genres/${media_type}`;

  if (!media_type) {
    throw new Error("'media_type' is required");
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const LazyLoadGenresGrid = ({ media_type }) => {
  const query = useQuery({
    queryKey: ["genres", { media_type }],
    queryFn: () => fetchGenresList(media_type),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const genres = query.data?.genres.map(({ id, name }) => {
    return (
      <Link
        key={id}
        to={`/collection/${id}`}
        className=" p-5 border border-white/20 font-urbanist text-lg text-white rounded-4xl tracking-wider font-semibold hover:bg-white hover:text-black duration-150"
      >
        {name}
      </Link>
    );
  });

  return (
    <div className="  min-h-50 relative">
      <div className=" flex flex-wrap gap-x-10 gap-y-5">{genres}</div>
      <LoadingOverlay isLoading={query.isLoading} zIndex={99} />
      <ErrorMessageOverlay erorrMessage={query.error?.message} />
    </div>
  );
};
