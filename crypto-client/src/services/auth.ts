import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const signupUser = async (userData: {
  name: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials, {
    withCredentials: true, // ensures cookie/session is sent
  });
  return response.data; // contains { id, email, name }
};
