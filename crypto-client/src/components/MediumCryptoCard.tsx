// src/components/MediumCryptoCard.tsx
import React from "react";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { CryptoData } from "../services/coingecko";

interface Props {
  crypto: CryptoData;
}

const MediumCryptoCard: React.FC<Props> = ({ crypto }) => {
  const { name, image, current_price, price_change_percentage_24h } = crypto;

  // Format price as Danish kroner
  const formattedPrice = current_price.toLocaleString("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  const change = price_change_percentage_24h;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isZero = change === 0;

  return (
    <Card
      maxW={{ base: "160px", md: "200px" }}
      w="100%"
      minH={{ base: "160px", md: "200px" }}
      bg="cardBg"
      boxShadow="lg"
      borderRadius="lg"
    >
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="100%"
      >
        {/* Header: Icon + Name */}
        <Box>
          <HStack spacing={2} mb={2}>
            <Image boxSize="20px" src={image} alt={name} />
            <Heading size="sm" noOfLines={1}>
              {name}
            </Heading>
          </HStack>
          {/* Price */}
          <Text fontSize="sm" color="gray.400">
            {formattedPrice}
          </Text>
        </Box>

        {/* 24h Change */}
        <Flex align="center" mt={4}>
          {isPositive && <ArrowUpIcon w={5} h={5} color="green.500" mr={1} />}
          {isNegative && (
            <ArrowDownIcon w={5} h={5} color="red.500" mr={1} />
          )}
          {isZero && (
            <Box boxSize="5px" borderRadius="full" bg="gray.500" mr={2} />
          )}
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={
              isPositive ? "green.500" : isNegative ? "red.500" : "gray.500"
            }
          >
            {Math.abs(change).toFixed(2)}%
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MediumCryptoCard;
