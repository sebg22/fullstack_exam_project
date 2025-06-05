import { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
