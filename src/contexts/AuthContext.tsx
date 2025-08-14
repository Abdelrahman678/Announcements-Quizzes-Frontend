import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

/* the shape of the authentication context */
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

/* create authentication context */
const AuthContext = createContext<AuthContextType | null>(null);

/* auth provider component to wrap the application */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* state to check authentication status, initialized from localStorage */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  /* function to handle user login */
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  /* function to handle user logout */
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  /* provide the auth context to child components */
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* custom hook to access the auth context and make sure context is not null */
export const useAuth = () => {
  /* get the current context value */
  const context = useContext(AuthContext);
  /* throw error if used outside of AuthProvider */
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  /* return the auth context */
  return context;
};
