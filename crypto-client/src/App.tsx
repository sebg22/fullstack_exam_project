import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CryptoTable from "./components/CryptoTable";

// type Crypto = {
//   id: string;
//   name: string;
//   symbol: string;
//   current_price?: number;
//   market_cap?: number;
//   image?: string;
// };

function App() {
  // ###################For MediumCryptoCard#############################
  // Example: determine which crypto objects to send as a prop to the component:
  // const { cryptos, loading } = useTopCryptos();
  // const oneCrypto = cryptos[0]; // For the top, single card
  // const fourCryptos = cryptos.slice(1, 5); // For the four cards at the bottom

  //Below is shown how to use the component and props
  //  {/* One card at the top, conditional check before passing oneCrypto to the component */}
  //  {oneCrypto ? <MediumCryptoCard crypto={oneCrypto} /> : <MediumCryptoCardSkeleton></MediumCryptoCardSkeleton>}
  //  </GridItem>
  //  <GridItem>
  //    {/* Four cards at the bottom, only render when at least 4 cryptos are available */}
  //    {fourCryptos.length > 3 ? fourCryptos.map((crypto) => <MediumCryptoCard key={crypto.id} crypto={crypto} />) : <MediumCryptoCardSkeleton></MediumCryptoCardSkeleton>}

  // ####################################################################

  return (
    <Router>
      <Grid templateAreas={{ base: `"header" "main"`, lg: `"header header" "aside main"` }}>
        <GridItem pl="2" area={"header"}>
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem w="150px" pl="2" area={"aside"}>
            aside
          </GridItem>
        </Show>
        <GridItem area={"main"}>
          <br />
          <h1>Cryptos</h1>
          <CryptoTable />
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
