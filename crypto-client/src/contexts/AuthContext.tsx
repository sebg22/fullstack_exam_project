import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../services/auth";

// this interface defines the structure of the auth context
// it tells TypeScript what values and functions are available in the context
interface AuthContextType {
  user: AuthUser | null;                     // the current logged-in user or null if not logged in
  setUser: (user: AuthUser | null) => void;  // a function to update the user
  logout: () => void;                        // a function to log the user out
  loading: boolean;                          // true while checking if a user is logged in
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// this component sets up the auth context and checks the user's session on page load
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount (first time the component is used)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data); // expects { id, email, name }
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false); 
      }
    };
    checkSession();
  }, []);

  // this function logs the user out by clearing the session
  const logout = async () => {
    await fetch(import.meta.env.VITE_API_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// this hook lets other components use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
