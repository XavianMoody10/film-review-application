import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { FormInput } from "../../components/FormInput/FormInput";
import { FormButton } from "../../components/FormButton/FormButton";
import { SignupForm } from "../../components/SignupForm/SignupForm";

export const Signup = () => {
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
