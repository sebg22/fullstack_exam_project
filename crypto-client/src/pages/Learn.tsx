import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Input,
  HStack,
  Image,
  Divider,
  Spinner
} from '@chakra-ui/react'
import coinCircles from '../assets/LearnPageCoinCircles.avif'
import walletPicture from '../assets/LearnPageWallet.avif'
import useTopCryptos from '../hooks/useTopCryptos'
import MediumCryptoCard from '../components/MediumCryptoCard'

export default function Learn() {
  const { cryptos, loading } = useTopCryptos()
  return (
    <>
      {/* ——— Centered content container ——— */}
      <Container maxW="7xl" px={{ base: 4, md: 8 }} py={{ base: 6, md: 12 }}>
        {/* Hero + Grid */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="flex-start"
          gap={{ base: 8, md: 12 }}
        >
          {/* Left: copy + CTA */}
          <Box flex="1">
            <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={4} color="text">
              Explore crypto like Bitcoin, Ethereum, and Dogecoin
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="text" >
              Simply and securely buy, sell, and manage hundreds of
              cryptocurrencies.
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              borderRadius="full"
            >
              See more assets
            </Button>
          </Box>

          {/* Right: icon grid */}
          <Box flex="2" w="90%">
          {loading ? (
          <Spinner size="xl" />
          ) : (
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} justifyItems="center">
            {cryptos.slice(0, 6).map(c => (
          <MediumCryptoCard key={c.id} crypto={c} />
        ))}
</SimpleGrid>
  )}
</Box>
        </Flex>

        {/* Subscribe section */}
        <Box mt={{ base: 12, md: 16 }} p={6} borderRadius="md">
          <Flex direction={{ base: 'column', md: 'row' }} align="center">
            <Box flex="1" mr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
              <Text mb={2} fontWeight="semibold">
                Take control of your money
              </Text>
              <Heading mb={4} size="lg">
                Start your portfolio today and discover crypto
              </Heading>
              <Text mb={6} color="text">
                We’re committed to creating more economic freedom through
                accessible, safe, and secure financial tools for everyone.
              </Text>
              <Flex as="form" align="center">
                <Input
                  placeholder="Enter your e-mail address"
                  size={{base: 'md', md: 'lg'}}
                  borderRadius="full"
                  flex="1"
                  mr={3}
                />
                <Button
                  colorScheme="blue" 
                  size="lg"
                  borderRadius="full"
              >
          Subscribe
        </Button>
              </Flex>
            </Box>
            <Box
              flex="1"
              display={{ base: 'none', md: 'block' }}
              h="300px"
              maxH="400px"
            >
              <Image
                src={coinCircles}
                alt="Coin logos in circles"
                objectFit="contain"
                boxSize="100%"
              />
            </Box>
          </Flex>
        </Box>
      </Container>

      {/* Full-bleed USDC section, negative mx to counter the margin from layout.tsx */}
      <Box bg="splitSection" py={{ base: 8, md: 12 }} mx={-5} px={5}>
  <Container maxW="7xl" px={{ base: 4, md: 8 }}>
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="flex-start"
      gap={{ base: 6, md: 8 }}
    >
      {/* Title */}
      <Box flex="1">
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          color="splitSectionText"
          mb={{ base: 4, md: 0 }}
        >
          USDC is the dollar for the digital age
        </Heading>
      </Box>

      {/* Text + Button */}
      <Box flex="1">
        <Text
          color="splitSectionText"
          mb={{ base: 4, md: 0 }}
        >
          USDC gives you 24/7 access to payments and financial services.
          Trade, spend, and send faster and more efficiently.
        </Text>
        <Button
          color="splitSectionButton"  
          size="lg"
          borderRadius="full"
          w={{ base: '100%', md: 'auto' }}
          mt={{ base: 2, md: 4 }}
        >
          Learn more
        </Button>
      </Box>
    </Flex>
  </Container>
</Box>
      {/* Wallet promotion section */}
      <Box bg="cardBg" py={{ base: 6, md: 12 }}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            gap={{ md: 8 }}
          >
            {/* Wallet Picture */}
            <Box flex="1" display={{ base: 'none', md: 'block' }}>
              <Image
                src={walletPicture}
                alt="Coinbase Wallet preview"
                borderRadius="md"
                w="55%"
              />
            </Box>

            {/* Copy + CTA */}
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
      <Box bg="blue" color="white" py={{ base: 8, md: 16 }} mx={-5} px={5}>
        <Container maxW="7xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
          >
            {/* Text & CTA */}
            <Box
              flex="1"
              textAlign={{ base: 'center', md: 'left' }}
              mb={{ base: 8, md: 0 }}
            >
              <Heading fontSize={{ base: '2xl', md: '3xl' }} mb={4}>
                Get started in a few minutes
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }}>
                Create an account, link your bank account, and start buying & selling.
              </Text>
              <Button
                bg="white"
                color="blue.600"
                size="lg"
                borderRadius="full"
                mt={6}
              >
                Create account
              </Button>
            </Box>

            {/* Mobile stats (stacked with horizontal dividers) */}
            <VStack
              flex="1"
              display={{ base: 'flex', md: 'none' }}
              spacing={4}
              align="center"
            >
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  $145B
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  QUARTERLY VOLUME TRADED
                </Text>
              </VStack>
              <Divider borderColor="whiteAlpha.600" w="full" />
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  100+
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  COUNTRIES SUPPORTED
                </Text>
              </VStack>
              <Divider borderColor="whiteAlpha.600" w="full" />
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  $130B
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  ASSETS ON PLATFORM
                </Text>
              </VStack>
            </VStack>

            {/* Desktop stats (horizontal with vertical dividers) */}
            <HStack
              flex="1"
              display={{ base: 'none', md: 'flex' }}
              spacing={{ md: 16 }}
              justify="center"
            >
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  $145B
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  QUARTERLY VOLUME TRADED
                </Text>
              </VStack>
              <Divider orientation="vertical" borderColor="whiteAlpha.600" h="full" />
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  100+
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  COUNTRIES SUPPORTED
                </Text>
              </VStack>
              <Divider orientation="vertical" borderColor="whiteAlpha.600" h="full" />
              <VStack>
                <Text fontSize="4xl" fontWeight="bold">
                  $130B
                </Text>
                <Text fontSize="sm" letterSpacing="widest">
                  ASSETS ON PLATFORM
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
