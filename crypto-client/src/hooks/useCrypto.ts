import { useEffect, useState } from "react";
import { getAllCryptos, CryptoData } from "../services/coingecko";

const useAllCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCryptos();
        setCryptos(data);
      } catch {
        setError("Failed to load all cryptocurrencies.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { cryptos, loading, error };
};

export default useAllCryptos;
