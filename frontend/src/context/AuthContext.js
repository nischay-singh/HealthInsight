// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("authToken"));

  const login = (token) => {
    Cookies.set("authToken", token, { expires: 1 }); // cookie expires in 1 day
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("authToken"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
