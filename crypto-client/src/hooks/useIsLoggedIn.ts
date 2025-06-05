// src/hooks/useIsLoggedIn.ts
import { useEffect, useState } from "react";
import { coingeckoApi } from "../services/coingecko";

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await coingeckoApi.get("/me");
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