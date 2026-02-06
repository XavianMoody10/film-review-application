import { Squash as Hamburger } from "hamburger-react";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../features/user/userSlice";

export const Header = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  async function logout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authentication/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const data = await response.text();
        throw Error(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("Yo");
      queryClient.removeQueries({ queryKey: ["user"] });
      dispatch(logoutUser());
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <header className=" fixed top-0 w-full flex items-center justify-between py-3 z-20 bg-black/5 backdrop-blur-lg rounded-xl">
      <div className=" flex items-center justify-between mx-auto w-full pr-3">
        <Hamburger size={23} color="white" />
        {user._id ? (
          <div className=" flex items-center gap-2">
            <span className=" text-white font-semibold">{user.username}</span>
            <LogoutIcon
              size={28}
              color="white"
              onClick={() => mutation.mutate()}
            />
          </div>
        ) : (
          <Link to={"/login"}>
            <UserIcon size={28} color="white" />
          </Link>
        )}
      </div>
    </header>
  );
};
