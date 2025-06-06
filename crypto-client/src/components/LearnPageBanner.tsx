import { Box,
  Container, Flex, Heading, Text, Button, VStack, HStack,Divider} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LearnPageBanner() {
  const navigate = useNavigate();
    return (
        <Box bg="blue" color="white" py={{ base: 8, md: 16 }} mx={-5} px={5}>
                <Container maxW="7xl">
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                  >
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
                        color="black"
                        size="lg"
                        borderRadius="full"
                        _hover={{ bg: 'gray.300' }}
                        mt={6}
                        onClick={() => navigate("/signup")}
                      >
                        Create account
                      </Button>
                    </Box>
                    {/* Mobile stats */}
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

                    {/* Desktop stats */}
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
    )
}