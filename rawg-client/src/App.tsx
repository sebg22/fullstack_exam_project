import { Grid, GridItem, Show } from "@chakra-ui/react";

type Filters = {
  // Define the properties of Filters here
};
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import CryptoTable from "./components/CryptoTable";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <>
      <Grid templateAreas={{ base: `"header" "main"`, lg: `"header header" "aside main"` }}>
        <GridItem pl="2" area={"header"}>
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem w="150px" pl="2" bg="gray.900" area={"aside"}>
            <SideMenu setFilter={function (filter: string): void {
              throw new Error("Function not implemented.");
            } } />
          </GridItem>
        </Show>
        <GridItem pl="8" pr="8" area={"main"}>
          <GameGrid></GameGrid>
        </GridItem>
      </Grid>
      <CryptoTable />
      <p>Dette er en test</p>
    </>
  );
}

export default App;
