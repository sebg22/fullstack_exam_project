import { Box, Button, Input, Heading } from "@chakra-ui/react";

function Login() {
  return (
    <Box maxW="sm" mx="auto" mt="50px" p="4" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Login to Coin Vault</Heading>
      <Input placeholder="E-mail" mb="4" />
      <Input placeholder="Password" mb="4" type="password" />
      <Button colorScheme="blue" width="100%">Login</Button>
    </Box>
  );
}

export default Login;
