import { Box, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import useFavorites from "../hooks/useFavorites";
import CryptoRow from "../components/CryptoRow";
import Footer from "../components/Footer";
import CryptoTable from "../components/CryptoTable";

// It uses the useFavorites hook to fetch and display the favorite coins
function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  return (
    <>
    <Box maxW="6xl" mx="auto" mt="50px" p="4">
      <Heading mb="6">Your Favorite Coins</Heading>

      {loading ? (
        <Flex justify="center" mt="20">
          <Spinner size="xl" />
        </Flex>
      ) : favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <CryptoTable cryptos={favorites} loading={false} error="" />
      )}
    </Box>
      <Footer />
    </>
  );
}

export default FavoritesPage;
