import { createContext, useState } from "react";

export const SideNavigationContext = createContext(null);

export const SideNavigationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SideNavigationContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SideNavigationContext.Provider>
  );
};
