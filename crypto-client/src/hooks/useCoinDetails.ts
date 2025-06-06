import { useEffect, useState } from "react";
import { getCoinDetails, CoinData } from "../services/crypto";

export default function useCoinDetails(id: string | undefined) {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        if (!id) return;
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (err) {
        setError("Failed to fetch coin data from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return { coin, loading, error };
}
