import axios from "axios";
import Cookies from "js-cookie";

const register = async (data) => {
  try {
    const result = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    return result;
  } catch (error) {
    throw new Error("User was not registered");
  }
};

const login = async (email, password) => {
  try {
    const result = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    return result;
  } catch (error) {
    throw new Error("Login failed");
  }
};

const logout = async () => {
  try {
    const result = await axios.post("http://localhost:3000/auth/logout");
    console.log("result---", result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Logout failed");
  }
};

export { register, login, logout };
