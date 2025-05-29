// src/pages/Login.tsx
import {
  Box,
  Stack,
  Heading,
  Input,
  Button,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaWallet } from "react-icons/fa";

export default function Login() {
  return (
    <Box
      w={{ base: "90%", sm: "400px" }} // Responsive width
      mx="auto"
      my={{base: 8, md: 24}}
      p={{base: 4, md: 6}}
      bg="var(--card-bg)"
      boxShadow="xl"
      borderRadius="2xl"
    >
      <Stack spacing={6}>
        {/* Title */}
        <Heading textAlign="center" size="lg">
          Log in to coinvault
        </Heading>

        {/* Email input */}
        <Input
          placeholder="Enter your e-mail address"
          variant="filled"
          size={{ base: "md", md: "lg" }}
          bg="var(--input-bg)"
          borderRadius="full"
        />

        {/* Primary login button */}
        <Button colorScheme="blue" size="lg" borderRadius="full" w="100%">
          Log In
        </Button>

        {/* ------ OR ------ */}
        <HStack spacing={2} align="center">
          <Divider borderColor="var(--divider-color)" />
          <Text fontSize={{ base: "xs", md: "sm" }} color="var(--text-color)" whiteSpace="nowrap">
            OR
          </Text>
          <Divider borderColor="var(--divider-color)" />
        </HStack>

        {/* Social signup buttons */}
        <Stack spacing={3}>
          <Button
            leftIcon={<FcGoogle />}
            variant="outline"
            size={{ base: "sm", md: "md" }}
            borderRadius="full"
            justifyContent="flex-start"
            bg="var(--social-bg)"
          >
            Signup with Google
          </Button>
          <Button
            leftIcon={<FaApple />}
            variant="outline"
            size={{ base: "sm", md: "md" }}
            borderRadius="full"
            justifyContent="flex-start"
            bg="var(--social-bg)"
          >
            Signup with Apple
          </Button>
          <Button
            leftIcon={<FaWallet />}
            variant="outline"
            size={{ base: "sm", md: "md" }}
            borderRadius="full"
            justifyContent="flex-start"
            bg="var(--social-bg)"
          >
            Signup with Wallet
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
