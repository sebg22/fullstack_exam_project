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
} from "@chakra-ui/react";
import useFavorites from "../hooks/useFavorites";
import CryptoRow from "../components/CryptoRow";
import Footer from "../components/Footer";

// uses the useFavorites hook to fetch the user's favorite coins
function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <Flex justify="center" mt="20">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
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
      <Footer />
    </>
  );
}

export default FavoritesPage;
