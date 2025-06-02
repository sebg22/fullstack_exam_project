import { useState } from "react";
import { Box, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/auth";

function Signup() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      await signupUser({ name, lastName, email, password });

      toast({
        title: "Success",
        description: "Registered successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Signup failed. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="50px" p="3" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Sign up to Coin Vault</Heading>
      <Input placeholder="Name" mb="4" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Last name" mb="4" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input placeholder="E-mail" mb="4" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" mb="4" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignup} isLoading={isLoading} colorScheme="blue" width="100%">
        Sign up
      </Button>
    </Box>
  );
}

export default Signup;
