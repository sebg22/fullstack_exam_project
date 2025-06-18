import { useAuth } from "../contexts/AuthContext";

// return true/false based on auth context
// file is outdated, we primarily use the auth context now
export default function useIsLoggedIn() {
  const { user } = useAuth();
  return !!user;
}
