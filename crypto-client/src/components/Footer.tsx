import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebookF, FaDiscord, FaTwitter } from "react-icons/fa";
import CoinvaultLogo from "./CoinVaultLogo";


const Footer: React.FC = () => {
  return (
    <Box as="footer" w="100%" bg="bg" color="footerTextColor" py={8}>
      <Grid
        // 1-column on mobile, 3-columns on md+
        templateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
        templateAreas={{
          base: `
            "logo"
            "address"
            "contact"
            "icons"
            "copyright"
          `,
          md: `
            "address center contact"
            "copyright copyright copyright"
          `,
        }}
        gap={{ base: 6, md: 8 }}
        w="100%"
        px={{ base: 4, md: 4 }}
      >
        <GridItem
          area="logo"
          display={{ base: "block", md: "none" }}
          textAlign="center">
          <CoinvaultLogo boxSize="150px" mx="auto" />
        </GridItem>

        <GridItem
          area="address"
          mt={{ base: -8, md: 0 }}
          textAlign={{ base: "center", md: "left" }}
          alignSelf={{ base: "auto", md: "center" }}
        >
          <Stack
            spacing={2}
            align={{ base: "center", md: "flex-start" }}
          >
            <Text fontWeight="bold" fontSize={{base: "md", md: "lg" }}>Address:</Text>
            <Text fontSize={{base: "md", md: "lg" }} color="footerSubTextColor" lineHeight="1.4">
              1234 Crypto Lane,
              <br />
              Blocktown, Web3 9000
            </Text>
          </Stack>
        </GridItem>

        <GridItem
          area="contact"
          textAlign={{ base: "center", md: "right" }}
          alignSelf={{ base: "auto", md: "center" }}
        >
          <Stack
            spacing={2}
            align={{ base: "center", md: "flex-end" }}
          >
            <Text fontWeight="bold" fontSize={{base: "md", md: "lg" }}>Contact:</Text>
            <Text fontSize={{base: "md", md: "lg" }} color="footerSubTextColor" lineHeight="1.4">
              support@coinvault.fake
              <br />
              +45 123 456 78
            </Text>
          </Stack>
        </GridItem>

        <GridItem
          area="icons"
          display={{ base: "block", md: "none" }}
          textAlign="center"
        >
          <Stack direction="row" justify="center" spacing={6}>
            <Link href="https://facebook.com" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebookF />}
                variant="ghost"
                size="lg"
                _hover= {{bg: "footerHoverColor "}}
              />
            </Link>
            <Link href="https://x.com" isExternal>
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
                _hover={{bg: "footerHoverColor "}}
              />
            </Link>
            <Link href="https://discord.com" isExternal>
              <IconButton
                aria-label="Discord"
                icon={<FaDiscord />}
                variant="ghost"
                size="lg"
                _hover={{bg: "footerHoverColor "}}
              />
            </Link>
          </Stack>
        </GridItem>


        <GridItem
          area="center"
          display={{ base: "none", md: "flex" }}
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          rowGap={6}
        >
          {/* Logo for size md+ */}
          <CoinvaultLogo boxSize="150px"  />
          

          {/* Social icons for size md+ */}
          <Stack direction="row" spacing={6}>
            <Link href="https://facebook.com" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebookF />}
                variant="ghost"
                size="lg"
                _hover={{bg: "footerHoverColor "}}
              />
            </Link>
            <Link href="https://x.com" isExternal>
              <IconButton
                aria-label="X / Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
                _hover={{bg: "footerHoverColor "}}
              />
            </Link>
            <Link href="https://discord.com" isExternal>
              <IconButton
                aria-label="Discord"
                icon={<FaDiscord />}
                variant="ghost"
                size="lg"
                _hover={{bg: "footerHoverColor "}}
              />
            </Link>
          </Stack>
        </GridItem>

        {/* COPYRIGHT (spans all 3 columns on md, appears last in mobile) */}
        <GridItem
          area="copyright"
          colSpan={{ base: 1, md: 3 }}
          textAlign="center"
        >
          <Box
            borderTop="1px solid"
            borderColor="divider"
            pt={4}
            mt={{ base: 6, md: 8 }}
          >
            <Text fontSize="sm" color="footerSubTextColor">
              © {new Date().getFullYear()} CoinVault
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;