import { HStack, Image, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <HStack width="100%" padding="10px">
      <Image src={logo} boxSize="60px" cursor="pointer" onClick={() => navigate("/")} />
      <ColorModeSwitch />
      <Spacer />
      {user ? (
        <>
          <Button colorScheme="blue" onClick={() => navigate("/editprofile")}>
            Edit Profile
          </Button>
          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button colorScheme="blue" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Login
          </Button>
        </>
      )}
    </HStack>
  );
};

export default NavBar;
