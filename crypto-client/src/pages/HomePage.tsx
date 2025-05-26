import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import CryptoTable from "../components/CryptoTable";
import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [cryptos, setCryptos] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((r) => r.json())
      .then(setUsers)
      .catch(console.error);

    fetch("http://localhost:5000/cryptos")
      .then((r) => r.json())
      .then(setCryptos)
      .catch(console.error);
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
        lg: `"header header" "aside main"`,
      }}
    >

      <Show above="lg">
        <GridItem area="aside" w="150px" pl="2">
          <SideMenu setFilter={function (filter: string): void {
            throw new Error("Function not implemented.");
          }} />
        </GridItem>
      </Show>

      <GridItem area="main">
        <div>
          <h1>Users</h1>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        </div>

        <br />

        <div>
          <h1>Cryptos</h1>
          <ul>
            {cryptos.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>

        <CryptoTable />
      </GridItem>
    </Grid>
  );
}
