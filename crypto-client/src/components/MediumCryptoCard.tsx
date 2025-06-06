import { Card, CardHeader, Heading, Text, Box, Image } from "@chakra-ui/react";
import { CryptoData } from "../services/crypto";

interface Props {
  cryptos: CryptoData;
}

const MediumCryptoCard = ({ cryptos }: Props) => {
  const priceNum = Number(cryptos.current_price);
  const changeNum = Number(cryptos.price_change_percentage_24h);

  const formattedPrice = Number.isNaN(priceNum) ? "N/A" : priceNum.toFixed(2);
  const formattedChange = changeNum === null || Number.isNaN(changeNum) ? "N/A" : changeNum.toFixed(2);

  return (
    <Box width="90%">
      <Card p={1} shadow="md" borderWidth="2px" borderRadius="25px">
        <CardHeader>
          <Image src={cryptos.image} boxSize="28px" />
          <Heading size="md" display={{ base: "none", md: "block" }}>
            {" "}
            {cryptos.name.toUpperCase()}
          </Heading>
          <Text>${formattedPrice}</Text>
          <Text color={changeNum >= 0 ? "green.500" : "red.500"}>24h Change: {formattedChange}%</Text>
        </CardHeader>
      </Card>
    </Box>
  );
};

export default MediumCryptoCard;
