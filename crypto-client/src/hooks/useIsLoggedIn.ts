import { useAuth } from "../contexts/AuthContext";

// return true/false based on auth context
export default function useIsLoggedIn() {
  const { user } = useAuth();
  return !!user;
}
