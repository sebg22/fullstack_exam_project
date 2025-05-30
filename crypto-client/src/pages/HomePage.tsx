import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
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
        <CryptoTable />
      </GridItem>
    </Grid>
  );
}
