import { Card, CardHeader, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTopCryptos, Crypto } from "../services/coingecko";

const CryptoCards = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopCryptos();
      if (data.length > 0) {
        // Change below depending on how many cards we want.
        setCryptos(data.slice(0, 4));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (cryptos.length === 0) return <Text>No crypto data available</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {cryptos.map((crypto) => (
        <Card key={crypto.id} p={1} shadow="md" borderWidth="2px" borderRadius="25px" width="90%">
          <CardHeader>
            <Heading size="md">{crypto.symbol.toUpperCase()}</Heading>
            <Text>${crypto.current_price.toFixed(2)}</Text>
            <Text color={crypto.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}>
              24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </CardHeader>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default CryptoCards;
