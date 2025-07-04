import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface CoinHeaderProps {
  name: string;
  symbol: string;
  image: string;
  // to check if the coin is favorited
  isFavorited: boolean;
  // function to toggle favorite status
  onFavoriteToggle: () => void;
}

export default function CoinHeader({ name, symbol, image, isFavorited, onFavoriteToggle }: CoinHeaderProps) {
  const navigate = useNavigate();

  return (
    <Flex align="center" wrap="wrap" gap={4} mb={6}>
      {/* Coin logo */}
      <Image src={image} alt={`${name} logo`} boxSize="32px" />

      {/* Name and symbol */}
      <Box>
        <Text fontWeight="bold" fontSize="sm" color="gray.600">
          {name}
        </Text>
        <Text fontSize="md" fontWeight="semibold">
          {symbol.toUpperCase()}
        </Text>
      </Box>

      {/* Star icon */}
      <span style={{ cursor: "pointer" }} onClick={onFavoriteToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill={isFavorited ? "#f6c700" : "#ccc"}
          viewBox="0 0 16 16"
          style={{ flexShrink: 0 }}
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 
            3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 
            5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 
            3.356-.83 4.73zm4.905-2.767l-3.686 
            1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 
            6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 
            1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 
            2.77a.564.564 0 0 0-.163.506l.694 
            3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      </span>

      {/* Currency + Buy Button block */}
      <Flex direction={{ base: "column", md: "row" }} gap={2}>
        <Button
          colorScheme="blue"
          rightIcon={<ArrowForwardIcon />}
          size="sm"
          width={{ base: "100%", md: "auto" }}
          onClick={() => navigate("/login")}
        >
          Buy {name}
        </Button>
      </Flex>
    </Flex>
  );
}
