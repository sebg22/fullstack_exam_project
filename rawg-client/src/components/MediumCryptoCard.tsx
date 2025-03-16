import { Card, CardHeader, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import useTopCryptos from "../hooks/useTopCryptos";
import { CryptoData } from "../services/coingecko";
interface Props {
  crypto: CryptoData;
}

const MediumCryptoCard = ({ crypto }: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <Card key={crypto.id} p={1} shadow="md" borderWidth="2px" borderRadius="25px" width="90%">
        <CardHeader>
          <Heading size="md">{crypto.symbol.toUpperCase()}</Heading>
          <Text>${crypto.current_price.toFixed(2)}</Text>
          <Text color={crypto.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</Text>
        </CardHeader>
      </Card>
    </SimpleGrid>
  );
};

export default MediumCryptoCard;


// MediumCryptoCard with variables, but did not want to implement yet, since its not in app.tsx at the moment
// const MediumCryptoCard = ({ crypto }: Props) => {
//   return (
//     <SimpleGrid columns={{ base: 1, md: 2 }} spacing="var(--grid-spacing)">
//       <Card
//         key={crypto.id}
//         style={{padding: "var(--card-padding)", boxShadow: "var(--card-shadow)", borderWidth: "var(--card-border-width)", borderRadius: "var(--card-border-radius)", width: "var(--card-width)"}}>
//         <CardHeader>
//           <Heading size="md">{crypto.symbol.toUpperCase()}</Heading>
//           <Text>${crypto.current_price.toFixed(2)}</Text>
//           <Text style={{color: crypto.price_change_percentage_24h >= 0 ? "var(--red500)" : "var(--green500)"}}>
//             24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
//           </Text>
//         </CardHeader>
//       </Card>
//     </SimpleGrid>
//   );
// };