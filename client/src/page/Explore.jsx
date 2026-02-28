import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import { SideNavigation } from "../components/SideNavigation";
import { MediaBackdroplider } from "../components/MediaBackdroplider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Explore = () => {
  const { mediaType } = useParams();
  const sideNavigationContext = useContext(SideNavigationContext);

  async function fetchGenres() {
    const url = `http://localhost:3000/genres/movie`;

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
    const endpoint = `http://localhost:3000/discover/movie/${id}/1`;

    return (
      <div className=" space-y-3" key={id}>
        <h2 className=" text-2xl text-white font-extralight tracking-wider">
          {name}
        </h2>

        <MediaBackdroplider
          key={id}
          queryKey={["genre", id]}
          endpoint={endpoint}
          mediaType={mediaType}
        />
      </div>
    );
  });

  return (
    <>
      <header className=" fixed top-0 w-full px-3 py-2 z-20">
        <Hamburger
          color="white"
          size={20}
          toggle={sideNavigationContext.setIsOpen}
          toggled={sideNavigationContext.isOpen}
        />
      </header>

      <SideNavigation />

      <main className="bg-linear-to-b from-black to-gray-900 min-h-screen pt-20 px-7">
        <div className=" space-y-10">{genresSlidersMap}</div>
      </main>
    </>
  );
};
