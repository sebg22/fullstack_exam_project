import {Box, Image, Text, Heading, Button, Flex, Container} from "@chakra-ui/react";
import walletPicture from '../assets/walletPicture.avif';

export default function LearnPageWallet() {
    return (
      <Box bg="cardBg" py={{ base: 6, md: 12 }}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            gap={{ md: 8 }}
          >
            <Box flex="1" display={{ base: 'none', md: 'block' }}>
              <Image
                src={walletPicture}
                alt="Coinbase Wallet preview"
                borderRadius="md"
                w="55%"
              />
            </Box>

            <Box flex="1">
              <Text
                fontWeight="bold"
                fontSize="sm"
                letterSpacing="wide"
                mb={2}
              >
                WALLET
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '4xl' }}
                mb={4}
              >
                Do more with your crypto with Coinbase Wallet
              </Heading>
              <Text mb={6} color="text">
                Store your crypto in your own personal crypto wallet and
                explore decentralized finance (DeFi), buy and sell NFTs, and more.
              </Text>
              <Button
                colorScheme='blue'
                size="lg"
                borderRadius="full"
              >
                Learn more
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
    )
}
