import { useCryptoFilters } from "../hooks/useCryptoFilters";
import { usePaginatedCryptos } from "../hooks/usePaginatedCryptos";
import { Grid, GridItem, Text, Link } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import { Link as RouterLink } from "react-router-dom";
import HomePageNewsletter from "../components/HomePageNewsletter";
import CoinvaultLogo from "../components/CoinVaultLogo";
import Footer from "../components/Footer";

export default function HomePage() {
  const { filters } = useCryptoFilters({ top: "10" }); // Default filters
  const { data: cryptos, loading, error } = usePaginatedCryptos(filters, 10); // Only page 1

  return (
    <Grid 
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main"`,
      }}>
      <GridItem area="header" mb={4}>
        <Text fontSize="xx-large" color="text">Today's top 10 cryptocurrencies</Text>
        <Text fontSize="small">The global crypto market cap is $2.96T. <Link as={RouterLink} to="/learn">Read More</Link></Text>  
      </GridItem>
      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />
        <HomePageNewsletter />
        <Footer />
      </GridItem>
    </Grid>
  );
}

