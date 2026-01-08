import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";

export const Header = () => {
  const sideNavigation = useContext(SideNavigationContext);

  return (
    <header className=" fixed top-0 w-full z-30 bg-white p-3">
      <div className=" flex justify-end items-center max-w-400 mx-auto w-full">
        <Hamburger
          size={25}
          toggled={sideNavigation.isOpen}
          toggle={sideNavigation.setIsOpen}
        />
      </div>
    </header>
  );
};
