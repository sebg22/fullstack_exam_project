import { useEffect, useState } from "react";
import { getTopCryptos, Crypto } from "../services/coingecko";

const useCryptos = () => {
  // State to store the list of cryptocurrencies
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to store errors (if any)
  const [error, setError] = useState("");

  // Fetch data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopCryptos(); // Fetch crypto data from API
        setCryptos(data); // Store the data in state
      } catch {
        setError("Failed to load cryptocurrency data.");
      } finally {
        setLoading(false); // Stop loading when done
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  return { cryptos, loading, error };
};

export default useCryptos;