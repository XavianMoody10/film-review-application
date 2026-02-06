import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();

  async function checkIfUserIsAuthenticated() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authentication/isauthenticated`,
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
              Account Login
            </h1>

            <LoginForm />

            <Link
              to={"/signup"}
              className=" block text-center text-white hover:underline"
            >
              Are you a new member?
            </Link>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};
