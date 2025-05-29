// pages/Learn.tsx
import React from 'react'
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  AspectRatio,
  Input,
  HStack,
  Image
} from '@chakra-ui/react'
import coinCircles from '../assets/LearnPageCoinCircles.avif'

function Learn() {


  return (
    <VStack
      align="stretch"
      spacing={0}
      w="100%"
      maxW="7xl" // 7x1 betyder 1280px
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 12 }}
    >
      {/**
       * Hero + Grid wrapper
       * - column on mobile
       * - row on md+
       */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
        gap={{ base: 8, md: 12 }}
      >
        {/** Left side: text + CTA */}
        <Box flex="1">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            mb={4}
          >
            Explore crypto like Bitcoin, Ethereum, and Dogecoin
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            mb={6}
          >
            Simply and securely buy, sell, and manage hundreds of
            cryptocurrencies.
          </Text>
          <Button
            bg="button"
            colorScheme="text"
            size="lg"
            w="full"
            borderRadius="full"
          >
            See more assets
          </Button>
        </Box>

        {/** Right side: filters (mobile) + grid */}
        <Box flex="2" w="100%">
          {/** 2 cols on mobile, 3 cols on desktop */}
          <SimpleGrid
            columns={{ base: 2, md: 3 }}
            spacing={{ base: 4, md: 6 }}
            w="100%"
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <AspectRatio key={idx} ratio={1} w="100%">
                <Box
                  mt="2rem"
                  bg="gray.50"
                  borderRadius="lg"
                  boxShadow="sm"
                />
              </AspectRatio>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      {/**  next section */}
      <Box
      mt={{ base: 12, md: 16 }}
      p={6}
      boxShadow="lg"
      borderRadius="md"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
      >
        {/* Left side: copy + form */}
        <Box flex="1" mr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
          <Text mb={2} fontWeight="semibold)">
            Take control of your money
          </Text>
          <Heading mb={4} size="lg">
            Start your portfolio today and discover crypto
          </Heading>
          <Text mb={6} color="text">
            We're commited to creating more economic freedom through accessible, safe, and secure financial tools for everyone.
          </Text>

          <Flex as="form" align="center">
            <Input
              placeholder="Enter your e-mail address"
              size="lg"
              borderRadius="full"
              flex="1"
              mr={3}
            />
            <Button
              bg="button"
              colorScheme="text"
              size="lg"
              borderRadius="full"
              px={8}
            >
              Subscribe
            </Button>
          </Flex>
        </Box>

        {/* Right side: image, hidden on mobile */}
        <Box
          flex="1"
          display={{ base: "none", md: "block" }}
          h="300px"               // or 100% of parent if you want the Box itself to stretch
          maxH="400px"            // whatever max you like
        >
          <Image
            src={coinCircles}
            alt="Coin logos in circles"
            objectFit="contain"
            boxSize="100%"        // fill the container
          />
        </Box>
      </Flex>
    </Box>
    <Box
      mt={{ base: 20, md: 24 }}>
        <HStack spacing={2}>
          <Text as="h1" 
                fontSize={{ base: '2xl', md: '3xl' }}
                my={4}> 
                USDC is the dollar for the digital age
          </Text>
          <VStack spacing={3} align="start">
            <Text>
              USDC gives you 24/7 access to payments and financial services. Trade, spend, and send faster and more efficiently.
            </Text>
            <Button 
              bg="button"
              colorScheme="text"
              size="lg"
              borderRadius="full"
            >
              Learn more
            </Button>
          </VStack>
        </HStack>
    </Box>


    </VStack>
  )
}

export default Learn
