// src/components/Footer.tsx

import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaDiscord } from "react-icons/fa";
import CoinvaultLogo from "./CoinvaultLogo";

const Footer: React.FC = () => {
  // Background and text colors (adjust as needed)
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box as="footer" w="100%" bg={bg} color={textColor}>
      {/* ──────────────────────────────────────────────── */}
      {/* Top section: Address | Logo+Links | Contact */}
      <Flex
        maxW="1200px"
        mx="auto"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "flex-start" }}
        gap={{ base: 8, md: 0 }}
      >
        {/* ── Left column: Address ── */}
        <Stack spacing={2} flex="1">
          <Text fontWeight="bold">Address:</Text>
          <Text fontSize="sm" color={subTextColor} lineHeight="1.4">
            1234 Crypto Lane,
            <br />
            Blocktown, Web3 9000
          </Text>
        </Stack>

        {/* ── Center column: Logo + Links ── */}
        <Stack
          spacing={4}
          textAlign="center"
          align="center"
          flex="1"
        >
          {/* Logo (responsive size) */}
          <CoinvaultLogo boxSize={{ base: "80px", md: "150px" }} />

          {/* Social Icons */}
          <Stack direction="row" spacing={4}>
            <Link href="https://facebook.com" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebookF />}
                variant="ghost"
                size="lg"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              />
            </Link>
            <Link href="https://x.com" isExternal>
              <IconButton
                aria-label="X / Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              />
            </Link>
            <Link href="https://discord.com" isExternal>
              <IconButton
                aria-label="Discord"
                icon={<FaDiscord />}
                variant="ghost"
                size="lg"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              />
            </Link>
          </Stack>
        </Stack>

        {/* ── Right column: Contact ── */}
        <Stack spacing={2} flex="1" textAlign={{ base: "left", md: "right" }}>
          <Text fontWeight="bold">Contact:</Text>
          <Text fontSize="sm" color={subTextColor} lineHeight="1.4">
            support@coinvault.fake
            <br />
            +00 123 456 789
          </Text>
        </Stack>
      </Flex>

      {/* ──────────────────────────────────────────────── */}
      {/* Bottom section: Copyright */}
      <Box borderTop="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Text
          textAlign="center"
          py={{ base: 4, md: 6 }}
          fontSize="sm"
          color={subTextColor}
        >
          © {new Date().getFullYear()} CoinVault
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
