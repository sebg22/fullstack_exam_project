import { Box, Button, Input, Heading } from "@chakra-ui/react";

function Signup() {
  return (
    <Box maxW="sm" mx="auto" mt="50px" p="3" boxShadow="lg" borderRadius="md">
        <Heading mb="4">Sign up to Coin Vault</Heading>
        <Input placeholder="Name" mb="4" /> 
        <Input placeholder="Last name" mb="4" />
        <Input placeholder="E-mail" mb="4" />
        <Input placeholder="Password" mb="4" type="password" />
        <Button colorScheme="blue" width="100%">Sign up</Button>
    </Box>
  );
}

export default Signup;
