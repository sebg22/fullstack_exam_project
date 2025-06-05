import { Flex, HStack, Button, Spacer, Box, Link } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import CoinvaultLogo from "./CoinVaultLogo";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfileIcon from "./ProfileIcon";
import Burgermenu from "./Burgermenu";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex
      as="nav"
      width="100%"
      px={4}             
      align="center"
      bgColor="bgColor"
      boxShadow="md"
      zIndex={10}
    >
      <Box
        cursor="pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <CoinvaultLogo boxSize="7rem" />
      </Box>

      {/* Desktop links */}
      <HStack
        spacing={8}
        ml="2rem"
        display={{ base: "none", md: "flex" }}
        align="center"
      >
        <Link
          fontWeight={isActive("/") ? "bold" : "normal"}
          textDecoration={isActive("/") ? "underline" : "none"}
          onClick={() => navigate("/")}
          _hover={{ textDecoration: "underline" }}
          cursor="pointer"
        >
          Home
        </Link>

        <Link
          fontWeight={isActive("/cryptocurrencies") ? "bold" : "normal"}
          textDecoration={isActive("/cryptocurrencies") ? "underline" : "none"}
          onClick={() => navigate("/cryptocurrencies")}
          _hover={{ textDecoration: "underline" }}
          cursor="pointer"
        >
          Cryptocurrencies
        </Link>

        <Link
          fontWeight={isActive("/learn") ? "bold" : "normal"}
          textDecoration={isActive("/learn") ? "underline" : "none"}
          onClick={() => navigate("/learn")}
          _hover={{ textDecoration: "underline" }}
          cursor="pointer"
        >
          Learn
        </Link>

        {user && (
          <Link
            fontWeight={isActive("/favorites") ? "bold" : "normal"}
            textDecoration={isActive("/favorites") ? "underline" : "none"}
            onClick={() => navigate("/favorites")}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
          >
            Favorites
          </Link>
        )}
      {/* Color switch for desktop */}
        <ColorModeSwitch />
      </HStack>

      {/* Mobile color switch */}
      <HStack spacing={2} display={{ base: "flex", md: "none" }} align="center">
        <ColorModeSwitch />
      </HStack>

      <Spacer />

      {/* Profile/Logout or SignUp/Login */}
      <HStack spacing={4} display={{ base: "none", md: "flex" }} align="center">
        {user ? (
          <>
            <ProfileIcon
              boxSize={6}
              color="iconColor"
              cursor="pointer"
              onClick={() => navigate("/editprofile")}
            />
            <Button colorScheme="red" size="sm" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </>
        )}
      </HStack>

      {/* Burger menu */}
      <HStack spacing={2} display={{ base: "flex", md: "none" }} align="center">
        <Burgermenu />
      </HStack>
    </Flex>
  );
};

export default NavBar;
