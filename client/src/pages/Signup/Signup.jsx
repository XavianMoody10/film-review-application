import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { loginUser } from "../../features/user/userSlice";

export const Signup = () => {
  const navigate = useNavigate();

  async function checkIfUserIsAuthenticated() {
    try {
      const response = await fetch(
        "http://localhost:3000/authentication/isauthenticated",
        {
          method: "GET",
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

  const query = useQuery({
    queryKey: ["user"],
    queryFn: checkIfUserIsAuthenticated,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.isAuthenticated === true) {
      navigate("/");
    }
  }, [query.data?.isAuthenticated]);

  return (
    <>
      <Header />

      <MainWrapper>
        <div className=" min-h-screen flex flex-col items-center justify-center gap-3">
          <div className=" w-full max-w-87.5 space-y-5">
            <h1 className=" text-3xl text-center text-white font-bold border-b border-b-white/15 pb-4 w-full">
              Create Account
            </h1>

            <SignupForm />

            <Link
              to={"/login"}
              className=" block text-center text-white hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};
