import { useContext } from "react";
import { LoginFormModal } from "../components/LoginFormModal";
import { SideNavigation } from "../components/SideNavigation";
import { SignupFormModal } from "../components/SignupFormModal";
import { AuthFormsContext } from "../contexts/AuthFormsContext";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const Template = () => {
  const authFormsContext = useContext(AuthFormsContext);

  return (
    <>
      <Header />
      <SideNavigation />
      {authFormsContext.isLoginFormOpen && <LoginFormModal />}
      {authFormsContext.isSignupFormOpen && <SignupFormModal />}
      <Outlet />
    </>
  );
};
