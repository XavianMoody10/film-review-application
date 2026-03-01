import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ _id: "", email: "" });

  async function checkSession() {
    const url = `${import.meta.env.VITE_MOCK_SERVICE_WORKER}/auth/session`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error("Error getting session");
    }
  }

  const query = useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    retry: false,
    refetchOnMount: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data?.isAuthenticated) {
        setUser(query.data.user);
      }
    }
  }, [query.isSuccess]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
