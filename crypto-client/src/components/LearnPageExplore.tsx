import { Box, Container, Flex, Heading, Text, Button, SimpleGrid, Input, Image, Spinner } from "@chakra-ui/react";
import MediumCryptoCard from "./MediumCryptoCard";
import coinCircles from "../assets/LearnPageCoinCircles.avif";
import { useCryptoFilters } from "../hooks/useCryptoFilters";
import { usePaginatedCryptos } from "../hooks/usePaginatedCryptos";

export default function LearnPageExplore() {
  const { filters } = useCryptoFilters({ top: "6" }); // Default filters
  const { data: cryptos, loading, error } = usePaginatedCryptos(filters, 6); // Only page 1

  if (error) {
    return <Text color="tomato">{error}</Text>;
  }

  return (
    <Container maxW="7xl" px={{ base: 4, md: 8 }} py={{ base: 6, md: 12 }}>
      <Flex direction={{ base: "column", md: "row" }} align="flex-start" gap={{ base: 8, md: 12 }}>
        <Box flex="1">
          <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} mb={4} color="text">
            Explore crypto like Bitcoin, Ethereum, and Dogecoin
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="text">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </Text>
          <Button colorScheme="blue" size="lg" w="full" borderRadius="full" mt="4">
            See more assets
          </Button>
        </Box>

        <Box flex="2" w="90%">
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} justifyItems="center">
              {cryptos.map((c) => (
                <MediumCryptoCard key={c.id} cryptos={c} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
      <Box mt={{ base: 12, md: 16 }} p={6} borderRadius="md">
        <Flex direction={{ base: "column", md: "row" }} align="center">
          <Box flex="1" mr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
            <Text mb={2} fontWeight="semibold">
              Take control of your money
            </Text>
            <Heading mb={4} size="lg">
              Start your portfolio today and discover crypto
            </Heading>
            <Text mb={6} color="text">
              We&apos;re committed to creating more economic freedom through accessible, safe, and secure financial tools for everyone.
            </Text>
            <Flex as="form" align="center">
              <Input placeholder="Enter your e-mail address" size={{ base: "md", md: "lg" }} borderRadius="full" flex="1" mr={3} />
              <Button colorScheme="blue" size="lg" borderRadius="full">
                Subscribe
              </Button>
            </Flex>
          </Box>
          <Box flex="1" display={{ base: "none", md: "block" }} h="300px" maxH="400px">
            <Image src={coinCircles} alt="Coin logos in circles" objectFit="contain" boxSize="100%" />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
