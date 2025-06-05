import { Box, Button, Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import { useCryptoFilters } from "../hooks/useCryptoFilters";
import { usePaginatedCryptos } from "../hooks/usePaginatedCryptos";
import SideMenu_mobile from "../components/SideMenu_mobile";

export default function CryptoCurrencies() {
  const { filters, setFilters } = useCryptoFilters({ top: "10" });
  const { data: cryptos, loading, error, hasMore, loadMore } = usePaginatedCryptos(filters, 10);

  return (
    <Grid
      templateAreas={{
        base: `"header" "aside" "main"`,
        lg: `"header header" "aside main"`,
      }}>
      <Show below="lg">
        <GridItem area="aside" w="100%" pl="2" pr="4">
          <SideMenu_mobile activeFilter={filters} setFilter={setFilters} />
        </GridItem>
      </Show>
      <Show above="lg">
        <GridItem area="aside" w="100%" pl="2" pr="4">
          <SideMenu activeFilter={filters} setFilter={setFilters} />
        </GridItem>
      </Show>

      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />

        {!loading && (
          <>
            {hasMore ? (
              <Box textAlign="center">
                <Button onClick={loadMore} mt={4}>
                  Show More
                </Button>
              </Box>
            ) : (
              cryptos.length > 0 && (
                <Box mt={4} textAlign="center" color="gray.500">
                  No more coins to show.
                </Box>
              )
            )}
          </>
        )}
      </GridItem>
    </Grid>
  );
}
