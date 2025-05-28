import { useEffect, useState } from "react";
import { Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getCoinDetails, CoinData } from "../services/coingecko";
import CoinHeader from "../components/CoinHeader";
import CoinDetails from "../components/CoinDetails";

export default function Coin() {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const data = await getCoinDetails(id!);
        setCoin(data);
      } catch (err) {
        setError("Failed to fetch coin data from CoinGecko.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCoin();
  }, [id]);  

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" p={4}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!coin) {
    return (
      <Box p={4}>
        <p>No data found.</p>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <CoinHeader name={coin.name} symbol={coin.symbol} />
      <CoinDetails
        price={coin.price}
        marketCap={coin.marketCap}
        description={coin.description}
      />
    </Box>
  );
}
