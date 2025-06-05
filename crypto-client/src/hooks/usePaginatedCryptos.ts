import { useEffect, useState } from "react";
import { CryptoData, getFilteredCryptos } from "../services/coingecko";
import { Filters } from "./useCryptoFilters"; // import type from step 1

export const usePaginatedCryptos = (filters: Filters, pageSize = 10) => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Reset pagination when filters change (deep comparison using JSON.stringify)
  useEffect(() => {
    console.log("Filters changed!!!", filters);
    setPage(1);
    setData([]);
    setHasMore(true);
  }, [JSON.stringify(filters)]);

  // Fetch data when filters, page, or pageSize change (deep comparison for filters)
  useEffect(() => {
    console.log("Fetching data with page", page, "and filters", filters);
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const params = { ...filters, page: String(page), pageSize: String(pageSize) };
        const result = await getFilteredCryptos(params);

        if (page === 1) {
          setData(result.data);
        } else {
          setData((prev) => [...prev, ...result.data]);
        }

        setHasMore(result.data.length === pageSize);
      } catch (err) {
        setError("Failed to fetch cryptocurrencies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filters), page, pageSize]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { data, loading, error, hasMore, loadMore };
};
