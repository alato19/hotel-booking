import { createContext, useContext, useState } from "react";
import { register, login, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    try {
      const result = await login(email, password);
      const userData = result.data;
      setUser(userData);
      console.log("Login successful:", userData);
      return userData;
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  const registerUser = async (data) => {
    try {
      const result = await register(data);
      console.log("result---", result);
    } catch (error) {
      console.log("error---", error);
    }
  };

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
