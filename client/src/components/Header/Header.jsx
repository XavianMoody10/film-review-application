import { Squash as Hamburger } from "hamburger-react";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className=" fixed top-0 w-full flex items-center justify-between py-1">
      <div className=" flex items-center justify-between mx-auto w-full pr-3">
        <Hamburger size={23} color="white" />
        <Link to={"/login"}>
          <UserIcon size={28} color="white" />
        </Link>
      </div>
    </header>
  );
};
