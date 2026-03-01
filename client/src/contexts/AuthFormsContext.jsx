import { createContext, useState } from "react";

export const AuthFormsContext = createContext();

export function AuthFormsProvider({ children }) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  return (
    <AuthFormsContext.Provider
      value={{
        isLoginFormOpen,
        setIsLoginFormOpen,
        isSignupFormOpen,
        setIsSignupFormOpen,
      }}
    >
      {children}
    </AuthFormsContext.Provider>
  );
}
