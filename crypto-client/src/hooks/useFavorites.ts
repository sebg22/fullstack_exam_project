import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getFavorites, CryptoData } from "../services/coingecko";

export default function useFavorites() {
  // State to store the list of favorite coins
  const [favorites, setFavorites] = useState<CryptoData[]>([]);

  // State to handle loading spinner
  const [loading, setLoading] = useState(true);

  // Chakra UI toast for error messages
  const toast = useToast();

  // React Router hook to redirect user
  const navigate = useNavigate();

  // useEffect runs when this hook is first used (on mount)
  useEffect(() => {
    // Try to fetch the user's favorite coins
    getFavorites()
      .then((data) => {
        setFavorites(data);      // store the favorites in state
        setLoading(false);       // stop showing spinner
      })
      .catch((err) => {
        // If the request fails (e.g. not logged in), show error and redirect
        console.error("failed to fetch favorites", err);
        toast({
          title: "Error",
          description: "Could not load favorites.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      });
  }, []); // runs only once on mount

  // Return the favorites and loading state to the component that uses this hook
  return { favorites, loading };
}
