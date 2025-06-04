import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoData, getFavorites } from "../services/coingecko";
import CryptoRow from "../components/CryptoRow";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  // fetch favorite coins when page loads
  useEffect(() => {
    getFavorites()
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("failed to fetch favorites", err);
        toast({
          title: "Error",
          description: "Could not load favorites.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      });
  }, []);

  if (loading) {
    return (
      <Flex justify="center" mt="20">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="6xl" mx="auto" mt="50px" p="4">
      <Heading mb="6">Your Favorite Coins</Heading>

      {favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th></Th>
              <Th>24h %</Th>
              <Th>Market Cap</Th>
              <Th>Volume</Th>
              <Th>Supply</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {favorites.map((coin) => (
              <CryptoRow key={coin.id} coin={coin} />
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default FavoritesPage;
