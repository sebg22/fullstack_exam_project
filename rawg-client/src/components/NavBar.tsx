import { HStack, Image, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import "../css/_variables.css";

const NavBar = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <HStack width="100%" padding="var(--spaceSmall)">
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
      <Spacer /> {/* Pushes the login button to the right */}
      <Button colorScheme="blue" onClick={() => navigate("/login")}> {/* Navigate to /login */}
        Login
      </Button>
    </HStack>
  );
};

export default NavBar;
