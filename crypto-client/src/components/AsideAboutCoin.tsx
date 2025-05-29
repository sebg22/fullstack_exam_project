import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface AsideAboutCoinProps {
  name: string;
  description: string;
}

export default function AsideAboutCoin({ name, description }: AsideAboutCoinProps) {
  return (
    <Box maxW="300px" p={4} borderRadius="md">
      <VStack align="start" spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          About {name}
        </Text>

        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        <Button colorScheme="blue" rightIcon={<ArrowForwardIcon />}>
          Buy {name}
        </Button>
      </VStack>
    </Box>
  );
}
