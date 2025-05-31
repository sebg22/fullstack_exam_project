import { Box, Flex, Text, VStack, HStack, Link, Image } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <Box bg="white" color="black" py={10} px={6} mt={20}>
      {/* Top Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={10}
        maxW="1000px"
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
      >
        {/* Address */}
        <VStack align={{ base: "flex-start", md: "center" }} spacing={1}>
          <Text fontWeight="bold">Address:</Text>
          <Text>1234 Crypto Lane,</Text>
          <Text>Blocktown, Web3 9000</Text>
        </VStack>

        {/* Center: Logo & Links */}
        <VStack spacing={3}>
          <HStack>
            <Image src="/logo.svg" alt="CoinVault logo" boxSize="30px" />
            <Text fontWeight="bold" fontSize="xl">coinvault</Text>
          </HStack>
          <Text>Links:</Text>
          <HStack spacing={4}>
            <Link href="#" aria-label="Facebook"><FaFacebook size={24} /></Link>
            <Link href="#" aria-label="Twitter"><FaTwitter size={24} /></Link>
            <Link href="#" aria-label="Discord"><FaDiscord size={24} /></Link>
          </HStack>
        </VStack>

        {/* Contact */}
        <VStack align={{ base: "flex-start", md: "center" }} spacing={1}>
          <Text fontWeight="bold">Contact:</Text>
          <Text>support@coinvault.fake</Text>
          <Text>+00 123 456 789</Text>
        </VStack>
      </Flex>

      {/* Bottom Copyright */}
      <Text textAlign="center" mt={10} fontSize="sm" color="gray.600">
        © 2025 CoinVault
      </Text>
    </Box>
  );
}
