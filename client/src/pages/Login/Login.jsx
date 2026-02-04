import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { FormInput } from "../../components/FormInput/FormInput";
import { LoginForm } from "../../components/LoginForm/LoginForm";

export const Login = () => {
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
