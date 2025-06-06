// This page is for admin users to manage other users (block, unblock, delete)

import {
  Box,
  Button,
  Heading,
  Text,
  useToast,
  Flex,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the shape of a user object
interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  is_blocked: boolean;
  is_deleted: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

function AdminPage() {
  // State to store users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  // Check if current user is allowed to access this page
  const [authorized, setAuthorized] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // This runs once when the page loads
  // It checks if the user is admin, and then loads the users
  useEffect(() => {
    axios
      .get(`${API_URL}/me`, { withCredentials: true })
      .then((res) => {
        const userId = res.data.userId;
        return axios.get(`${API_URL}/user/${userId}`, { withCredentials: true });
      })
      .then((res) => {
        const user = res.data;
        if (user.role === "admin") {
          setAuthorized(true);
          fetchUsers(); // Load the user list
        } else {
          toast({
            title: "Access denied",
            description: "You must be an admin to view this page.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        // If not logged in or error, redirect to login
        console.error("Not logged in or error checking role", err);
        navigate("/login");
      });
  }, []);

  // This function gets all users from the server
  const fetchUsers = () => {
    axios
      .get(`${API_URL}/admin/users`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);     // store the user list
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        toast({
          title: "Error loading users",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // This function is called when admin clicks block, unblock, or delete
  const handleAction = (id: string, action: "block" | "unblock" | "delete") => {
    axios
      .patch(`${API_URL}/admin/${action}/${id}`, {}, { withCredentials: true })
      .then(() => {
        toast({
          title: `User ${action}ed`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchUsers(); // refresh the user list
      })
      .catch((err) => {
        console.error(`Failed to ${action} user`, err);
        toast({
          title: `Failed to ${action} user`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // If the user is not admin, show nothing
  if (!authorized) {
    return null;
  }

  // Show spinner while loading users
  if (loading) {
    return (
      <Flex justify="center" mt="20">
        <Spinner size="xl" />
      </Flex>
    );
  }

  // Render the user list
  return (
    <Box maxW="4xl" mx="auto" mt="50px" p="4" boxShadow="lg" borderRadius="md">
      <Heading mb="6">Admin - User Management</Heading>
      {users.map((user) => (
        <Box key={user.id} p="4" mb="4" borderWidth="1px" borderRadius="md">
          <Flex justify="space-between" align="center" flexWrap="wrap">
            <Box>
              <Text fontWeight="bold">
                {user.name} {user.last_name} ({user.role})
              </Text>
              <Text fontSize="sm">{user.email}</Text>
              {user.is_blocked && <Text color="red.500">Blocked</Text>}
              {user.is_deleted && <Text color="gray.500">Deleted</Text>}
            </Box>
            <Stack direction="row" mt={{ base: 2, md: 0 }}>
              {/* Show buttons depending on user status */}
              {!user.is_blocked && !user.is_deleted && (
                <Button
                  colorScheme="red"
                  onClick={() => handleAction(user.id, "block")}
                >
                  Block
                </Button>
              )}
              {user.is_blocked && !user.is_deleted && (
                <Button
                  colorScheme="green"
                  onClick={() => handleAction(user.id, "unblock")}
                >
                  Unblock
                </Button>
              )}
              {!user.is_deleted && (
                <Button
                  variant="outline"
                  onClick={() => handleAction(user.id, "delete")}
                >
                  Delete
                </Button>
              )}
            </Stack>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

export default AdminPage;
