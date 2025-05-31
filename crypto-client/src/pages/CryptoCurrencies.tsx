import { Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import useCrypto from "../hooks/useCrypto";

export default function CryptoCurrencies() {
  const { cryptos, loading, error } = useCrypto(); // Get data using our custom hook
  return (
    <>
      <Grid
        templateAreas={{
          base: `"header" "main"`,
          lg: `"header header" "aside main"`,
        }}>
        <Show above="lg">
          <GridItem area="aside" w="150px" pl="2">
            <SideMenu
              setFilter={function (filter: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </GridItem>
        </Show>

        <GridItem area="main">
          <CryptoTable cryptos={cryptos} loading={loading} error={error} />
        </GridItem>
      </Grid>
    </>
  );
}
