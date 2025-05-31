import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import useTopCryptos from "../hooks/useTopCryptos";

export default function Cryptocurrencies() {
  const { cryptos, loading, error } = useTopCryptos(); // Get data using our custom hook

  return (
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
        <h1>Today's Cryptocurrency Prices by Market Cap</h1>
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />
      </GridItem>
    </Grid>
  );
}
