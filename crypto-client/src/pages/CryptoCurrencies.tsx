import { Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import { useFilteredCryptos } from "../hooks/useFilteredCryptos";
import { useState } from "react";
import { FilterParams } from "../services/coingecko";

export default function CryptoCurrencies() {
  // Initial filters with page and pageSize: Top 10
  const [filters, setFilters] = useState<FilterParams>({
    page: "1",
    pageSize: "20", // default to Top 10
    top: "10",
  });

  // Use your filtered hook that fetches based on the filters
  const { data: cryptos, loading, error } = useFilteredCryptos(filters);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}>
      <Show above="lg">
        <GridItem area="aside" w="100%" pl="2" pr="4">
          <SideMenu
            activeFilter={filters} // so the menu knows which filter is active
            setFilter={(newFilters: FilterParams) =>
              setFilters({
                ...newFilters,
                page: "1", // always reset to page 1 on new filter
              })
            }
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />
      </GridItem>
    </Grid>
  );
}
