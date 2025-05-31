import { Grid, GridItem } from "@chakra-ui/react";
import CryptoTable from "../components/CryptoTable";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";

export default function CryptoCurrencies() {
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "300px 1fr" }}
        gap={{ base: 4, md: 8 }}
        padding={4}
      >
        {/* Aside on the left */}
        <GridItem>
          <SideMenu
            setFilter={function (filter: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        </GridItem>

        {/* Main content */}
        <GridItem>
          <CryptoTable />
        </GridItem>
      </Grid>

      {/* Footer */}
      <Footer />
    </>
  );
}
