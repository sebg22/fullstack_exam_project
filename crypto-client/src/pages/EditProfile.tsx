import { Box, Button, Input, Heading } from "@chakra-ui/react";

// This component is used to edit the user's profile information

function EditProfile() {
  return (
    <Box maxW="sm" mx="auto" mt="50px" p="4" boxShadow="lg" borderRadius="md">
      <Heading mb="4">Edit Your Profile</Heading>
      <Input placeholder="First Name" mb="4" />
      <Input placeholder="Last Name" mb="4" />
      <Input placeholder="Email" mb="4" />
      <Button colorScheme="blue" width="100%">Save Changes</Button>
    </Box>
  );
}

export default EditProfile;
