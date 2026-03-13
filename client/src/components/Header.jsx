import { Search as SearchIcon } from "lucide-react";
import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";

export const Header = () => {
  const sideNavigationContext = useContext(SideNavigationContext);

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
    </header>
  );
};
