import {Box, Container, Flex, Heading, Text, Button} from "@chakra-ui/react";

export default function LearnPageUSDC() {
    return (
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
    )
}