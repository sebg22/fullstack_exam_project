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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

// Check if user is admin and fetch users
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
          fetchUsers();
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
        console.error("Not logged in or error checking role", err);
        navigate("/login");
      });
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${API_URL}/admin/users`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
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
        fetchUsers();
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

  if (!authorized) {
    return null;
  }

  if (loading) {
    return (
      <Flex justify="center" mt="20">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
