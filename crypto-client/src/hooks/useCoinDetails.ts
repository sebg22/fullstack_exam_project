import { useEffect, useState } from "react";
import { getCoinDetails, CoinData } from "../services/crypto";

// this hook fetches detailed data for a single coin based on its ID
export default function useCoinDetails(id: string | undefined) {
  // stores the coin's data from the API
  const [coin, setCoin] = useState<CoinData | null>(null);

  const [loading, setLoading] = useState(true);

  // stores any error message in case the request fails
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        if (!id) return; // if no ID is provided, stop here
        const data = await getCoinDetails(id); // fetch coin data from API
        setCoin(data); // save the data in state
      } catch (err) {
        setError("Failed to fetch coin data from API."); // show error if fetch fails
      } finally {
        setLoading(false); // hide the spinner whether it fails or succeeds
      }
    };

    fetchCoin();
  }, [id]); // re-run this logic whenever the ID changes

  // return the coin data, loading state, and any error message to the component that uses this hook
  return { coin, loading, error };
}
