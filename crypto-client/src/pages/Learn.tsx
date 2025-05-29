// pages/Learn.tsx
import React from 'react'
import {
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  AspectRatio,
} from '@chakra-ui/react'

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
            colorScheme="blue"
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
        <Text mb={2} fontWeight="semibold">
          Take control of your money
        </Text>
        <Heading mb={4} size="lg">
          Start your portfolio today and discover crypto
        </Heading>
        <Text mb={6} color="gray.200"> {/* this needs to be drawn from variables.css */}
          We're commited to creating more economic freedom through accessible, safe, and secure financial tools for everyone.
        </Text>
                                        {/* colorScheme needs to be drawn from variables.css */}
        <Button
          colorScheme="blue"
          size="lg"
          w="full"
          borderRadius="full"
        >
          Subscribe
        </Button>
      </Box>
    </VStack>
  )
}

export default Learn
