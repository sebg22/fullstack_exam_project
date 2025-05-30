import { useEffect, useState } from "react";
import { getTopCryptos, CryptoData } from "../services/coingecko";

const useTopCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopCryptos();
        setCryptos(data);
      } catch {
        setError("Failed to load top cryptocurrencies.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { cryptos, loading, error };
};

export default useTopCryptos;
