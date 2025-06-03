import { HStack, Image, Button, Spacer, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CoinvaultLogo from "./CoinVaultLogo";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfileIcon from "./ProfileIcon";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <HStack width="100%" padding="10px" mt="-1rem">
      <CoinvaultLogo ml="1rem" boxSize="100px" cursor="pointer" onClick={() => navigate("/")} />
      <ColorModeSwitch />
      <Spacer />
      {user ? (
        <>
          <Button colorScheme="blue" onClick={() => navigate("/learn")}>
            Learn
          </Button>
          <ProfileIcon onClick={() => navigate("/editprofile")} cursor={"pointer"} boxSize={35} color="iconColor"/>
          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button colorScheme="blue" mr="0.5rem" onClick={() => navigate("/learn")}>
            Learn
          </Button>
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
