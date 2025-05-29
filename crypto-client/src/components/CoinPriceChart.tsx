import { Box, Flex, Text } from "@chakra-ui/react";

interface CoinPriceChartProps {
  price: number;
  change: number; // 24h percentage change
}

export default function CoinPriceChart({ price, change }: CoinPriceChartProps) {
  const isPositive = change >= 0;
  const changeValue = (price * change) / 100;

  return (
    <Box>
      {/* Price and change on the same line */}
      <Flex align="center" gap={4} mb={2}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={isPositive ? "green.500" : "red.500"}
        >
          USD {price.toFixed(3)}
        </Text>

        <Text color={isPositive ? "green.500" : "red.500"}>
          {isPositive ? "↑" : "↓"} USD {changeValue.toFixed(2)} ({change.toFixed(2)}%)
        </Text>
      </Flex>

      {/* Chart placeholder */}
      <Box height="200px" bg="beige" borderRadius="md" />
    </Box>
  );
}
