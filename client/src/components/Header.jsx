import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";

export const Header = () => {
  const sideNavigationContext = useContext(SideNavigationContext);

  return (
    <header className=" fixed top-0 w-full px-3 py-2 z-20">
      <Hamburger
        color="white"
        size={20}
        toggle={sideNavigationContext.setIsOpen}
        toggled={sideNavigationContext.isOpen}
      />
    </header>
  );
};
