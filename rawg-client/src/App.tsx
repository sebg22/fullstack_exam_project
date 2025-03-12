import { Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import CryptoTable from "./components/CryptoTable";
import LargeGuide from "./components/LargeGuide";
import image1 from "./assets/Learn_Illustration1.webp";

function App() {
  return (
    <>
      <Grid templateAreas={{ base: `"header" "main"`, lg: `"header header" "aside main"` }}>
        <GridItem pl="2" area={"header"}>
          <NavBar />
        </GridItem>
        <Show above="lg">
          <GridItem w="150px" pl="2" bg="gray.900" area={"aside"}>
            aside
          </GridItem>
        </Show>
        <GridItem pl="8" pr="8" area={"main"}>
          <GameGrid></GameGrid>
        </GridItem>
      </Grid>
      <Flex>
        <LargeGuide img={image1} label="Beginner's Guide" title="What is Bitcoin" description="Bitcoin is the world's first widely adopted cryptocurrency — it allows for secure and seamless peer-to-peer transactions on the internet." />
        <LargeGuide img={image1} label="Beginner's Guide" title="Guide to DeFi tokens and altcoins" description="From Aave to Zcash, decide what to trade with our beginner's guide" />
      </Flex>

      <CryptoTable />
    </>
  );
}

export default App;
