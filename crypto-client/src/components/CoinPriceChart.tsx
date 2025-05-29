import { Box, Text, HStack, VStack } from "@chakra-ui/react";

interface CoinPriceChartProps {
  price: number;
  change: number; // percentage change, e.g., -1.54 or 2.34
}

export default function CoinPriceChart({ price, change }: CoinPriceChartProps) {
  const isPositive = change >= 0;
  const arrow = isPositive ? "↑" : "↓";
  const changeColor = isPositive ? "green.500" : "red.500";
  const changeValue = ((price * change) / 100).toFixed(2);

  return (
    <VStack align="start" spacing={4} width="100%" mt={8}>
      {/* Price and change */}
      <HStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="red.500">
          USD {price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        <Text fontSize="lg" color={changeColor}>
          {arrow} USD {changeValue} ({change.toFixed(2)}%)
        </Text>
      </HStack>

      {/* Placeholder chart */}
      <Box width="100%" height="250px" bg="orange.50" borderRadius="md" />
    </VStack>
  );
}
