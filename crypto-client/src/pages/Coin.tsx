import { useEffect, useState } from "react";
import { Box, Spinner, Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getCoinDetails, CoinData } from "../services/coingecko";
import CoinHeader from "../components/CoinHeader";
import AsideAboutCoin from "../components/AsideAboutCoin";
import CoinPriceChart from "../components/CoinPriceChart";
import CoinStats from "../components/CoinStats";

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
    <Box>
      {/* Header without border */}
      <Box px={6} py={4}>
        <CoinHeader name={coin.name} symbol={coin.symbol} image={coin.image} />
      </Box>

      {/* Main layout */}
      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 6, md: 8 }} align="start" px={6} py={6}>
        {/* Sidebar */}
        <Box order={{ base: 2, md: 1 }} pt={{ base: 6, md: 0 }} pr={{ md: 8 }}>
          <AsideAboutCoin name={coin.name} description={coin.description} />
        </Box>

        {/* Main content */}
        <Box flex="1" order={{ base: 1, md: 2 }} pb={{ base: 6, md: 0 }} pl={{ md: 8 }}>
          <CoinPriceChart price={coin.price} change={coin.priceChangePercentage24h} />

          <Box>
            <Box py={6}>
              <CoinStats
                marketCap={coin.marketCap}
                fdv={coin.fdv}
                circulatingSupply={coin.circulatingSupply}
                totalSupply={coin.totalSupply}
                maxSupply={coin.maxSupply}
                ath={coin.ath}
                marketCapRank={coin.marketCapRank}
                volume24h={coin.volume24h}
                priceChangePercentage1y={coin.priceChangePercentage1y}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
