import { Tr, Td, Image, Text, HStack, Button } from "@chakra-ui/react";
import { LineChart, Line, YAxis } from "recharts";
import { CryptoData } from "../services/coingecko";
import { formatCurrencyCompact } from "../utils/formatCurrency";
import { formatNumberCompact } from "../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import useIsCoinFavorited from "../hooks/useIsCoinFavorited";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

interface Props {
  coin: CryptoData;
}

const CryptoRow = ({ coin }: Props) => {
const navigate = useNavigate();

const { isFavorited, toggleFavorite } = useIsCoinFavorited(coin.id);

const isLoggedIn = useIsLoggedIn();

// this function runs when the user clicks the star icon
const handleFavoriteClick = async (e: React.MouseEvent) => {
  // stop the click from opening the coin page
  e.stopPropagation();

  // if the use is not logged in, redirect them to the login page when they click on the star icon
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  // toggle the favorite state
  // this will also update the isFavorited state in the hook
  toggleFavorite();
};

  const miniChartData = coin.chart_data?.map((point) => ({
    price: point.price,
  })) || [];

return (
  <Tr onClick={() => navigate(`/coin/${coin.id}`)} cursor="pointer" _hover={{ bg: "footerHoverColor" }}>
    {/* Coin name + star */}
    <Td p={6}>
      <HStack spacing={2}>
        <svg
          style={{ flexShrink: 0 }}
          onClick={handleFavoriteClick}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={isFavorited ? "#f6c700" : "#ccc"}
          className="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
        <Image src={coin.image} alt={coin.name} boxSize="24px" />
        <Text fontWeight="bold" color="text">
          {coin.name} ({coin.symbol.toUpperCase()})
        </Text>
      </HStack>
    </Td>

    {/* Price */}
    <Td p={6} color="text">
      ${coin.current_price.toLocaleString()}
    </Td>

    {/* Mini Chart */}
    <Td p={6} display={{ base: "none", md: "table-cell" }} width="120px">
      {coin.chart_data && coin.chart_data.length > 0 ? (
        <LineChart
          width={100}
          height={40}
          data={coin.chart_data.map((point) => ({ price: point.price }))}
        >
          <YAxis hide domain= {['dataMin', 'dataMax']} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={coin.price_change_percentage_24h >= 0 ? "#16c784" : "#ea3943"}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      ) : (
        <Text fontSize="sm" color="gray.400">–</Text>
      )}
    </Td>

    {/* Change % */}
    <Td p={6} color={Number(coin.price_change_percentage_24h) >= 0 ? "green.500" : "red.500"}>
      {coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h !== undefined && !isNaN(Number(coin.price_change_percentage_24h))
        ? Number(coin.price_change_percentage_24h).toFixed(2)
        : "N/A"}%
    </Td>

    {/* Market Cap */}
    <Td p={6} color="text" display={{ base: "none", md: "table-cell" }}>
      {formatCurrencyCompact(coin.market_cap)}
    </Td>

    {/* 24h Volume */}
    <Td p={6} color="text" display={{ base: "none", md: "table-cell" }}>
      {formatCurrencyCompact(coin.total_volume)}
    </Td>

    {/* Supply */}
    <Td p={6} color="text" display={{ base: "none", md: "table-cell" }}>
      {formatNumberCompact(coin.circulating_supply)}
    </Td>

    {/* Trade button */}
    <Td p={6}>
      <Button bg="#173da6" color="white" size="md" borderRadius="md" _hover={{ bg: "#0f2a8b" }}>
        Trade
      </Button>
    </Td>
  </Tr>
);

};

export default CryptoRow;
