import { createContext, useContext, useState, useEffect } from "react";
import {
  register_user_service,
  login_user_service,
  logout_user_service,
  checkAuth_user_service,
} from "../services/authenticate";

const AuthenticateContext = createContext({});

export const AuthenticateProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    checkAuthUser();
  }, [trigger]);

  // ✅ Register user
  const register = async (data) => {
    try {
      const result = await register_user_service(data);
      setAuthUser(result);
      return result;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // ✅ Login user
  const login = async (data) => {
    try {
      const result = await login_user_service(data);
      setAuthUser(result);
      return result;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // ✅ Logout user
  const logout = async () => {
    try {
      await logout_user_service();
      setAuthUser(null);
      setTrigger(!trigger); // trigger re-check
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ✅ Check if user is authenticated
  const checkAuthUser = async () => {
    try {
      const result = await checkAuth_user_service();
      setAuthUser(result);
      return result;
    } catch {
      setAuthUser(null);
    } finally {
      setIsAuthChecked(true);
    }
  };

  const values = {
    authUser,
    register,
    login,
    logout,
    checkAuthUser,
    isAuthChecked,
  };

  return (
    <AuthenticateContext.Provider value={values}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export const useAuthenticateContext = () => useContext(AuthenticateContext);
