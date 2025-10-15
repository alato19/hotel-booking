import axios from "axios";

const register = async (data) => {
  try {
    const result = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    return result;
  } catch (error) {
    throw new Error("");
  }
};

const login = async (email, password) => {};

export { register, login };
