import { useEffect, useState } from "react";
import { CryptoData, getFilteredCryptos } from "../services/coingecko";

export const useFilteredCryptos = (filters: Record<string, any>) => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(""); // reset error
      try {
        const result = await getFilteredCryptos(filters);
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError("Failed to fetch cryptocurrencies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, totalPages, loading, error };
};
