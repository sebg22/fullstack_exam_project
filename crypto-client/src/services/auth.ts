import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Reusable types for auth
export interface SignupData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

// Signup
export const signupUser = async (userData: SignupData): Promise<void> => {
  await authApi.post("/signup", userData);
};

// Login
export const loginUser = async (credentials: LoginCredentials): Promise<AuthUser> => {
  const response = await authApi.post("/login", credentials);
  return response.data;
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await authApi.post("/logout");
};

// Get current user session
export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await authApi.get("/me");
  return response.data;
};
