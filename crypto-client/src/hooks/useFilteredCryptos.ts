import { useEffect, useState } from "react";
import { CryptoData, getFilteredCryptos } from "../services/coingecko";

type Filters = Record<string, any>;

export const useFilteredCryptos = (filters?: Filters, pageSize = 10) => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reset data & page when filters change
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // Include filters + pagination
        const params = { ...filters, page: String(page), pageSize: String(pageSize) };
        const result = await getFilteredCryptos(params);
        console.log("API result:", result);

        setData((prev) => (page === 1 ? result.data : [...prev, ...result.data]));

        // If fewer items than requested, no more pages
        setHasMore(result.data.length === pageSize);
      } catch {
        setError("Failed to fetch cryptocurrencies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, page, pageSize]);

  // Function to load next page
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return { data, loading, error, hasMore, loadMore };
};
