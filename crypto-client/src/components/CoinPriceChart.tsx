import { Box, Flex, Text } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrencyCompact } from "../utils/formatCurrency";
import { ChartPoint } from "../services/crypto";

interface CoinPriceChartProps {
  price: number;
  change: number; // 24h percentage change
  chartData: ChartPoint[];
}

export default function CoinPriceChart({ price, change, chartData }: CoinPriceChartProps) {
  const isPositive = change >= 0;
  const changeValue = (price * change) / 100;

  return (
    <Box>
      {/* Price and change on the same line */}
      <Flex align="center" gap={4} mb={2}>
        <Text fontSize="2xl" fontWeight="bold" color={isPositive ? "green.500" : "red.500"}>
          USD {formatCurrencyCompact(price)}
        </Text>

        <Text color={isPositive ? "green.500" : "red.500"}>
          {isPositive ? "↑" : "↓"} USD {changeValue.toFixed(2)} ({change.toFixed(2)}%)
        </Text>
      </Flex>

      {/* Chart placeholder */}
      {/* <Box height="200px" bg="beige" borderRadius="md" /> */}
      <Box height="250px" borderRadius="md" bg="gray.50" p={2}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip formatter={(val: number) => `$${val.toFixed(2)}`} />
            <Line type="monotone" dataKey="price" stroke="#3182CE" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
