import { Box, Flex, Text, IconButton, Select, Image, Button } from "@chakra-ui/react";
import { StarIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; 

interface CoinHeaderProps {
  name: string;
  symbol: string;
  image: string;
}

export default function CoinHeader({ name, symbol, image }: CoinHeaderProps) {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      wrap="wrap"
      gap={4}
      mb={6}
    >
      {/* Coin logo */}
      <Image
        src={image}
        alt={`${name} logo`}
        boxSize="32px"
      />

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
      <IconButton
        aria-label="Favorite"
        icon={<StarIcon />}
        variant="ghost"
        size="sm"
      />

      {/* Currency + Buy Button block */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={2}
      >

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
