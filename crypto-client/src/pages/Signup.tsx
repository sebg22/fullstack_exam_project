import { Box, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { signupUser } from "../services/auth";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const [isLoading, setIsLoading] = useState(false);

const handleSignup = async () => {
  setIsLoading(true);
  try {
    const result = await signupUser(form);
    toast({
      title: "Success",
      description: "Registered successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setForm({ name: "", lastName: "", email: "", password: "" });
  } catch (error: any) {
    const message =
      error.response?.data?.error || "Signup failed. Try again.";

    toast({
      title: "Error",
      description: message,
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
      <Input name="name" placeholder="Name" mb="4" onChange={handleChange} />
      <Input name="lastName" placeholder="Last name" mb="4" onChange={handleChange} />
      <Input name="email" placeholder="E-mail" mb="4" onChange={handleChange} />
      <Input name="password" placeholder="Password" mb="4" type="password" onChange={handleChange} />
      <Button onClick={handleSignup} isLoading={isLoading} colorScheme="blue" width="100%">
        Sign up
      </Button>
    </Box>
  );
}

export default Signup;
