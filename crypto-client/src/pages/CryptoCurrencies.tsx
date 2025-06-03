import { useState } from "react";
import { Box, Button, Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import { useFilteredCryptos } from "../hooks/useFilteredCryptos";
import { FilterParams } from "../services/coingecko";

export default function CryptoCurrencies() {
  // Set the initial default filter here:
  const [filters, setFilters] = useState<FilterParams>({ top: "10" });

  // 2. Use your hook with this state
  const { data: cryptos, loading, error, hasMore, loadMore } = useFilteredCryptos(filters, 10);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}>
      <Show above="lg">
        <GridItem area="aside" w="100%" pl="2" pr="4">
          {/* 3. Pass filters and setter to SideMenu */}
          <SideMenu activeFilter={filters} setFilter={setFilters} />
        </GridItem>
      </Show>

      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />

        {!loading && (
          <>
            {hasMore ? (
              <Box textAlign="center">
                <Button
                  onClick={() => {
                    loadMore();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                  }}
                  mt={4}>
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
