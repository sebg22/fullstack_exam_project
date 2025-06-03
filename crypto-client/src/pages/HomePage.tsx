import { Grid, GridItem } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import { useCryptoFilters } from "../hooks/useCryptoFilters";
import { usePaginatedCryptos } from "../hooks/usePaginatedCryptos";

export default function HomePage() {
  const { filters } = useCryptoFilters({ top: "10" }); // Default filters
  const { data: cryptos, loading, error } = usePaginatedCryptos(filters, 10); // Only page 1

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
