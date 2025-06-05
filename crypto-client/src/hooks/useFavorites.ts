import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getFavorites, CryptoData } from "../services/coingecko";
import { useAuth } from "../contexts/AuthContext";

export default function useFavorites() {
  // State to store the list of favorite coins
  const [favorites, setFavorites] = useState<CryptoData[]>([]);

  // State to handle loading spinner
  const [loading, setLoading] = useState(true);

  // Chakra UI toast for error messages
  const toast = useToast();

  // React Router hook to redirect user
  const navigate = useNavigate();

  // custom hook to check if user is logged in
  const { user, loading: authLoading } = useAuth();

  // useEffect runs when this hook is first used (on mount)
  useEffect(() => {
    // wait for auth to finish loading
    if (authLoading) return;

    // try to fetch the user's favorite coins
    if (user) {
      getFavorites()
        .then((data) => {
          setFavorites(data);      // store the favorites in state
          setLoading(false);       // stop showing spinner
        })
        .catch((err) => {
          // if the request fails (e.g. not logged in), show error
          console.error("failed to fetch favorites", err);
          toast({
            title: "error",
            description: "could not load favorites.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      // user is not logged in, stop loading and redirect
      setLoading(false);
      navigate("/login");
    }
  }, [user, authLoading]); // runs again if login status changes

  // return the favorites and loading state to the component that uses this hook
  return { favorites, loading };
}
