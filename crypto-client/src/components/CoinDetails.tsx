import { Box, Text, VStack } from "@chakra-ui/react";

interface CoinDetailsProps {
  price: number;
  marketCap: number;
  description: string;
}

export default function CoinDetails({ price, marketCap, description }: CoinDetailsProps) {
  return (
    <VStack align="start" spacing={3}>
      <Text fontWeight="bold">Price: ${price.toFixed(6)}</Text>
      <Text fontWeight="bold">Market Cap: ${marketCap}</Text>
      <Box>
        <Text fontWeight="bold">Description:</Text>
        <Text>{description}</Text>
      </Box>
    </VStack>
  );
}
