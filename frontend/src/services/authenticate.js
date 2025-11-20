import axios from "axios";

// ✅ Only use import.meta.env for Vite
const API_URL =
  import.meta.env.VITE_API_URL || "https://hotel-booking-d4se.onrender.com";
const url = `${API_URL}auth`;

export const register_user_service = async (data) => {
  const result = await axios.post(`${url}/register`, data, {
    withCredentials: true,
  });
  return result.data;
};

export const login_user_service = async (data) => {
  const result = await axios.post(`${url}/login`, data, {
    withCredentials: true,
  });
  return result.data;
};

export const logout_user_service = async () => {
  const result = await axios.post(
    `${url}/logout`,
    {},
    { withCredentials: true }
  );
  return result.data;
};

export const checkAuth_user_service = async () => {
  const result = await axios.get(`${url}/checkUser`, { withCredentials: true });
  return result.data;
};
