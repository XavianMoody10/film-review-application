import { useContext, useState } from "react";
import { IoClose as CloseIcon } from "react-icons/io5";
import { AuthFormsContext } from "../contexts/AuthFormsContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { MdErrorOutline as ErrorIcon } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";

export const LoginFormModal = () => {
  const authFormsContext = useContext(AuthFormsContext);
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler() {
    const url = `${import.meta.env.VITE_MOCK_SERVICE_WORKER}/auth/login`;

    if (!email) {
      throw new Error("Please enter an email");
    }

    if (!password) {
      throw new Error("Please enter a password");
    }

    try {
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  const mutation = useMutation({
    mutationFn: loginHandler,
    onSuccess: (data) => {
      userContext.setUser(data.user);
      authFormsContext.setIsLoginFormOpen(false);
    },
  });

  return (
    <div className=" fixed top-0 right-0 bottom-0 left-0 h-screen w-full bg-black/60 flex items-center justify-center z-30">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className=" bg-white w-[90%] max-w-100 p-5 space-y-8 rounded-lg"
      >
        <CloseIcon
          size={30}
          className=" w-fit ml-auto cursor-pointer"
          onClick={() => authFormsContext.setIsLoginFormOpen(false)}
        />

        <div className=" text-center font-bold tracking-wider text-2xl">
          Member Login
        </div>

        {mutation.isError && (
          <div className=" bg-red-500 p-3 w-full flex items-center justify-center gap-1 rounded-md">
            <span className=" text-white font-medium tracking-wide">
              {mutation.error.message}
            </span>
            <ErrorIcon color="white" size={30} />
          </div>
        )}

        <div className=" w-full space-y-2">
          <input
            type="email"
            placeholder="Email"
            className=" tracking-wider border border-gray-400 w-full py-2 px-1.5"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" tracking-wider border border-gray-400 w-full py-2 px-1.5"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className=" w-full py-2 bg-black text-white tracking-wider rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
};
