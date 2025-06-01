import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { formatCurrencyCompact } from "../utils/formatCurrency";
import { formatNumberCompact } from "../utils/formatNumber";

interface CoinStatsProps {
  marketCap: number;
  fdv: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  marketCapRank: number;
  volume24h: number;
  priceChangePercentage1y: number;
}

export default function CoinStats(props: CoinStatsProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
      {/* Market Stats */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Market Stats
        </Text>
        <VStack align="start" spacing={2}>
          <Text>
            <strong>Market Cap:</strong> {formatCurrencyCompact(props.marketCap)}
          </Text>
          <Text>
            <strong>FDV:</strong> {formatCurrencyCompact(props.fdv)}
          </Text>
          <Text>
            <strong>Circulating Supply:</strong> {formatNumberCompact(props.circulatingSupply)}
          </Text>
          <Text>
            <strong>Total Supply:</strong> {formatNumberCompact(props.totalSupply)}
          </Text>
          <Text>
            <strong>Max Supply:</strong> {props.maxSupply ? formatNumberCompact(props.maxSupply) : "∞"}
          </Text>
        </VStack>
      </Box>

      {/* Performance */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Performance
        </Text>
        <VStack align="start" spacing={2}>
          <Text>
            <strong>Popularity:</strong> #{props.marketCapRank}
          </Text>
          <Text>
            <strong>Volume (24H):</strong> {formatCurrencyCompact(props.volume24h)}
          </Text>
          <Text>
            <strong>All Time High:</strong> {formatCurrencyCompact(props.ath)}
          </Text>
          <Text color={props.priceChangePercentage1y >= 0 ? "green.500" : "red.500"}>
            <strong>Overall Price Change (1Y):</strong> {props.priceChangePercentage1y.toFixed(2)}%
          </Text>
        </VStack>
      </Box>
    </Grid>
  );
}
