import {
  Box,
  Text,
  Button,
  Image,
  Heading,
  Input,
  HStack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import homePageMailImage from "../assets/HomePageMail.png";

export default function HomePageNewsletter() {
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="bg"
      borderRadius="md"
      direction={{ base: "column", md: "row" }}
    >
      <VStack
        align="flex-start"
        spacing={4}
        flex="1"
        mr={{ md: 8 }}
        mb={{ base: 6, md: 0 }}
        pl={{ base: 4, md: 6 }}
      >
        <Heading fontSize="2xl" mt={2}>
          Stay on top of crypto. All the time, any time.
        </Heading>
        <Text fontSize="lg" color="text">
          Please keep me updated by email with the latest crypto news, research
          findings, reward programs, event updates, coin listings and more information from CoinVault.
        </Text>
        <HStack w="70%" spacing={4}>
          <Input
            type="email"
            placeholder="Enter your email address"
            borderRadius="full"
            bgColor="inputBg"
            borderColor="divider"
          />
          <Button colorScheme="blue" borderRadius="full">
            Subscribe
          </Button>
        </HStack>
      </VStack>

      <Box flexShrink={0} p={0} m={0}>
        <Image
          src={homePageMailImage}
          alt="Subscribe to our newsletter"
          objectFit="cover"
          boxSize={{ base: "100%", md: "350px" }}
          display={{base: "none", md: "block"}}
        />
      </Box>
    </Flex>
  );
}
