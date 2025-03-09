import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import CryptoTable from "./components/CryptoTable";
import Login from "./Login";
import MediumCryptoCard from "./components/MediumCryptoCard";

function App() {
  return (
    <Router>
      <Grid 
        templateAreas={{ base: `"header" "main"`, lg: `"header header" "aside main"` }}
      >
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
          <MediumCryptoCard />
        </GridItem>
      </Grid>
      <CryptoTable />
    </Router>
  );
}

export default App;
