import { useState } from "react";
import { Box, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await loginUser({ email, password });
      setUser({ ...user, id: Number(user.id) });

      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/");
    } catch (error: any) {
    const errorData = error.response?.data;

    let description = "Login failed. Try again.";

    if (errorData?.errors) {
      // Pick the first validation message
      const firstError = Object.values(errorData.errors)[0];
      if (typeof firstError === "string") {
        description = firstError;
      }
    } else if (errorData?.error) {
      // Fallback for single error message
      description = errorData.error;
    }

    toast({
      title: "Error",
      description,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

  return (
    <Box maxW="sm" mx="auto" mt="50px" p="4" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Login to Coin Vault</Heading>
      <Input
        placeholder="E-mail"
        mb="4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        mb="4"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="blue" width="100%" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
