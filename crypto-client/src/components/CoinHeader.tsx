import { Box, Flex, Text, IconButton, Select, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface CoinHeaderProps {
  name: string;
  symbol: string;
  image: string;
}

export default function CoinHeader({ name, symbol, image }: CoinHeaderProps) {
  return (
    <Flex align="center" gap={4} mb={6}>
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

      {/* Favorite star */}
      <IconButton
        aria-label="Favorite"
        icon={<StarIcon />}
        variant="ghost"
        size="sm"
      />

      {/* Currency dropdown */}
      <Select size="sm" width="80px" defaultValue="USD">
        <option value="USD">USD</option>
        <option value="DKK">DKK</option>
      </Select>
    </Flex>
  );
}
