import { createContext, useState } from "react";

export const SideNavigationContext = createContext();

export function SideNavigationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SideNavigationContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SideNavigationContext.Provider>
  );
}
