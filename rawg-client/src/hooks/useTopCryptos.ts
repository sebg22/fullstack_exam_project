import { useEffect, useState } from "react";
import { getTopCryptos, CryptoData } from "../services/coingecko";

const useTopCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopCryptos();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { cryptos, loading };
};

export default useTopCryptos;
