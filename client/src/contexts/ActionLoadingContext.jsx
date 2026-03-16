import { createContext, useState } from "react";

export const ActionLoadingContext = createContext(null);

export const ActionLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ActionLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </ActionLoadingContext.Provider>
  );
};
