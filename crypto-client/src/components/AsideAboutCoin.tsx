import { useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";

interface AsideAboutCoinProps {
  name: string;
  description: string;
}

export default function AsideAboutCoin({ name, description }: AsideAboutCoinProps) {
  const [showFull, setShowFull] = useState(false);
  const charLimit = 300;
  const isLong = description.length > charLimit;

  const displayedText =
    showFull || !isLong
      ? description
      : description.slice(0, charLimit) + "...";

  return (
    <Box
      maxW={{ base: "100%", md: "300px" }}
      p={4}
      borderRadius="md"
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          About {name}
        </Text>

        <Text fontSize="sm" color="gray.400" whiteSpace="pre-line">
          {displayedText}
        </Text>

        {isLong && (
          <Button
            size="sm"
            variant="link"
            colorScheme="blue"
            onClick={() => setShowFull(!showFull)}
          >
            {showFull ? "Show Less" : "Show More"}
          </Button>
        )}
      </VStack>
    </Box>
  );
}
