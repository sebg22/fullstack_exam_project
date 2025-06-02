import { Box, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const toast = useToast();

  // Fetch profile data
  useEffect(() => {
    axios.get("http://localhost:5000/me", { withCredentials: true })
      .then(res => {
        const userId = res.data.userId;
        return axios.get(`http://localhost:5000/user/${userId}`, { withCredentials: true });
      })
      .then(res => {
        const { name, last_name, email } = res.data;
        setName(name);
        setLastName(last_name);
        setEmail(email);
      })
      .catch(err => {
        console.error("Failed to load profile", err);
        toast({
          title: "Error loading profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  // Submit profile update
const handleSave = () => {
  axios
    .put("http://localhost:5000/profile", { name, lastName, email }, { withCredentials: true })
    .then(() => {
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.error("Update error", err);

      const errorData = err.response?.data;

      let description = "Failed to update profile.";

      if (errorData?.errors) {
        const firstError = Object.values(errorData.errors)[0];
        if (typeof firstError === "string") {
          description = firstError;
        }
      } else if (errorData?.error) {
        description = errorData.error;
      }

      toast({
        title: "Error",
        description,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

  return (
    <Box maxW="sm" mx="auto" mt="50px" p="4" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Edit Your Profile</Heading>
      <Input
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb="4"
      />
      <Button colorScheme="blue" width="100%" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  );
}

export default EditProfile;
