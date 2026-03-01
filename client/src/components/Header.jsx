import { Squash as Hamburger } from "hamburger-react";
import { useContext } from "react";
import { SideNavigationContext } from "../contexts/SideNavigationContext";
import { FiUserPlus as SignupIcon } from "react-icons/fi";
import { LuUser as LoginIcon } from "react-icons/lu";
import { AuthFormsContext } from "../contexts/AuthFormsContext";
import { UserContext } from "../contexts/UserContext";
import { IoIosLogOut as LogoutIcon } from "react-icons/io";

export const Header = () => {
  const sideNavigationContext = useContext(SideNavigationContext);
  const authFormsContext = useContext(AuthFormsContext);
  const userContext = useContext(UserContext);

  return (
    <header className=" fixed top-0 w-full px-3 py-2 z-20 flex items-center justify-between">
      <Hamburger
        color="white"
        size={20}
        toggle={sideNavigationContext.setIsOpen}
        toggled={sideNavigationContext.isOpen}
      />

      {!userContext.user._id ? (
        <div className=" flex items-center gap-3">
          <div
            onClick={() => authFormsContext.setIsLoginFormOpen(true)}
            className=" cursor-pointer h-12.5 w-12.5 bg-white/10 flex items-center justify-center rounded-full text-white hover:text-black hover:bg-white duration-150"
          >
            <LoginIcon size={30} />
          </div>

          <div
            onClick={() => authFormsContext.setIsSignupFormOpen(true)}
            className=" cursor-pointer h-12.5 w-12.5 bg-white/10 flex items-center justify-center rounded-full text-white hover:text-black hover:bg-white duration-150"
          >
            <SignupIcon size={30} />
          </div>
        </div>
      ) : (
        <div className=" flex items-center gap-2">
          <span className=" text-white tracking-wider">
            {userContext.user.email}
          </span>

          <div className=" cursor-pointer h-12.5 w-12.5 bg-white/10 flex items-center justify-center rounded-full text-white hover:text-black hover:bg-white duration-150">
            <LogoutIcon size={30} />
          </div>
        </div>
      )}
    </header>
  );
};
