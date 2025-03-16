import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { getTopCryptos, CryptoData } from "../services/coingecko";

const CryptoTable = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getTopCryptos();
      setCryptos(data);
      setLoading(false);
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Coin</Th>
            <Th>Price</Th>
            <Th>Market Cap</Th>
            <Th>24h Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cryptos.map((coin, index) => (
            <Tr key={coin.id}>
              <Td>{index + 1}</Td>
              <Td>
                <Image src={coin.image} alt={coin.name} boxSize="24px" mr={2} />
                <Text as="span" fontWeight="bold">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Text>
              </Td>
              <Td>${coin.current_price.toLocaleString()}</Td>
              <Td>${coin.market_cap.toLocaleString()}</Td>
              <Td color={coin.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
