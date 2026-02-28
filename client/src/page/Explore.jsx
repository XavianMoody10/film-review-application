import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import { SideNavigation } from "../components/SideNavigation";

export const Explore = () => {
  const sideNavigationContext = useContext(SideNavigationContext);

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

      <main className="bg-linear-to-b from-black to-gray-900 min-h-screen"></main>
    </>
  );
};
