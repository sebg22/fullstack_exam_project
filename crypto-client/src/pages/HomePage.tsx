import { Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import { useFilteredCryptos } from "../hooks/useFilteredCryptos";

export default function HomePage() {
  const { data: cryptos, loading, error } = useFilteredCryptos(); // Get data using our custom hook

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main"`,
      }}>
      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />
      </GridItem>
    </Grid>
  );
}
