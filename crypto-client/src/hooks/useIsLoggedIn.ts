// src/hooks/useIsLoggedIn.ts
import { useEffect, useState } from "react";
import axios from "axios";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get("/me", { withCredentials: true });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return isLoggedIn;
}
// This hook checks if the user is logged in by making a request to the "/me" endpoint.
// If the request is successful, it sets `isLoggedIn` to true; otherwise, it sets it to false.