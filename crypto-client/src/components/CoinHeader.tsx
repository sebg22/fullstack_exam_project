import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface CoinHeaderProps {
  name: string;
  symbol: string;
}

export default function CoinHeader({ name, symbol }: CoinHeaderProps) {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Heading size="lg">
        {name} ({symbol.toUpperCase()})
      </Heading>
      <Text fontSize="sm" color="gray.500">
      </Text>
    </Flex>
  );
}
