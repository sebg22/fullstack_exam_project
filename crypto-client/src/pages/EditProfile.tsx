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


export default function Login() {
  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="100px"
      p="6"
      bg="var(--card-bg)"
      boxShadow="xl"
      borderRadius="2xl"
    >
      <Stack spacing={5}>
        {/* Title */}
        <Heading textAlign="center" size="lg">
          Edit your profile
        </Heading>
        {/* First name input */}
        <Input
          placeholder="Enter your first name"
          variant="filled"
          size="lg"
          bg="var(--input-bg)"
          borderRadius="full"
        />
        {/* Last name input */}
        <Input
          placeholder="Enter your last name"
          variant="filled"
          size="lg"
          bg="var(--input-bg)"
          borderRadius="full"
        />
        {/* Email input */}
        <Input
          placeholder="Enter your e-mail address"
          variant="filled"
          size="lg"
          bg="var(--input-bg)"
          borderRadius="full"
        />
        {/* Confirm button */}
        <Button colorScheme="blue" size="lg" borderRadius="full" w="100%">
          Save Changes
        </Button>  
      </Stack>
    </Box>
  );
}
