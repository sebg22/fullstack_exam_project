import { Grid, GridItem, Show } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import useTopCryptos from "../hooks/useTopCryptos";
import Footer from "../components/Footer";

export default function HomePage() {
  const { cryptos, loading, error } = useTopCryptos(); // Get data using our custom hook

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "main"`,
      }}>
      <GridItem area="main">
        <CryptoTable cryptos={cryptos} loading={loading} error={error} />
      < Footer />
      </GridItem>
    </Grid>
    
  );
}
