import { HStack, Image, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profileLogo from "../assets/profile_icon.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <HStack width="100%" padding="10px">
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
      <Spacer /> {/* Pushes the login button to the right */}
      <Image src={profileLogo} boxSize="40px" onClick={() => navigate("/editProfile")} cursor={"pointer"} mr={{base: "0.5rem", md: "0.5rem"}}/>
      <Button colorScheme="blue" size={{base: "sm", md: "lg"}} onClick={() => navigate("/login")}> {/* Navigate to /login */}
        Login
      </Button>
    </HStack>
  );
};

export default NavBar;
