import { Flex, HStack, Button, Spacer, Box, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CoinvaultLogo from "./CoinVaultLogo";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfileIcon from "./ProfileIcon";
import Burgermenu from "./Burgermenu";
import { useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Laver det den side, der er aktiv, fed og understreget
  const isActive = (path: string) => location.pathname === path;

  return (
    <Flex as="nav" width="100%" px="1rem" align="center" bgColor="bgColor" boxShadow="md" zIndex={10}>
      {/** ─── Logo (always visible) ─── **/}
      <Box cursor="pointer" onClick={() => {
          navigate("/");
        }}>
        <CoinvaultLogo boxSize="7rem"/>
      </Box>

      {/** ─── Desktop Links (only on md+) ─── **/}
      <HStack spacing={8} ml="2rem" display={{ base: "none", md: "flex" }} align="center"
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
          textDecoration={
            isActive("/cryptocurrencies") ? "underline" : "none"
          }
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
        
        {/** ─── ONLY SHOW “Favourites” IF USER IS LOGGED IN ─── **/}
        {user && (
          <Link
            fontWeight={isActive("/favourites") ? "bold" : "normal"}
            textDecoration={isActive("/favourites") ? "underline" : "none"}
            onClick={() => navigate("/favourites")}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
          >
            Favourites
          </Link>
        )}

        {/** ─── ONLY SHOW “Admin” IF USER EXISTS AND HAS role === 'admin' ─── **/}
        {user?.role === "admin" && (
          <Link
            fontWeight={isActive("/admin") ? "bold" : "normal"}
            textDecoration={isActive("/admin") ? "underline" : "none"}
            onClick={() => navigate("/admin")}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
          >
            Admin
          </Link>
        )}
        <ColorModeSwitch />
      </HStack>

      {/** ─── Mobile view: show ColorModeSwitch + Burger menu ─── **/}
      <HStack spacing={2} display={{ base: "flex", md: "none" }} align="center">
        <ColorModeSwitch />
      </HStack>
      
      <Spacer />

      {/** ─── Right‐hand side controls on Desktop (md+) ─── **/}
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

      {/** ─── Mobile view: show ColorModeSwitch + Burger menu ─── **/}
      <HStack spacing={2} display={{ base: "flex", md: "none" }} align="center">
        <Burgermenu />
      </HStack>
    </Flex>
  );
};
export default NavBar;