import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import CryptoTable from "./components/CryptoTable";
import Login from "./Login";
import MediumCryptoCard from "./components/MediumCryptoCard";
import useTopCryptos from "./hooks/useTopCryptos";
import MediumCryptoCardSkeleton from "./components/MediumCryptoCardSkeleton";

function App() {
  // ###################For MediumCryptoCard#############################
  // Example: determine which crypto objects to send as a prop to the component:
  const { cryptos, loading } = useTopCryptos();
  const oneCrypto = cryptos[0]; // For the top, single card
  const fourCryptos = cryptos.slice(1, 5); // For the four cards at the bottom
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

        <GridItem pl="8" pr="8" area={"main"}>
          <Routes>
            <Route path="/" element={<GameGrid />} /> {/* Add a route to the GameGrid component */}
            <Route path="/login" element={<Login />} /> {/* Add a route to the Login component */}
          </Routes>
        </GridItem>
        <GridItem>
          <GridItem>
            {/* One card at the top, conditional check before passing oneCrypto to the component */}
            {oneCrypto ? <MediumCryptoCard crypto={oneCrypto} /> : <MediumCryptoCardSkeleton></MediumCryptoCardSkeleton>}
          </GridItem>
          <GridItem>
            {/* Four cards at the bottom, only render when at least 4 cryptos are available */}
            {fourCryptos.length > 3 ? fourCryptos.map((crypto) => <MediumCryptoCard key={crypto.id} crypto={crypto} />) : <MediumCryptoCardSkeleton></MediumCryptoCardSkeleton>}
          </GridItem>
        </GridItem>
      </Grid>
      <CryptoTable />
    </Router>
  );
}

export default App;
