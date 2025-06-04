// Burgermenu.tsx
import React from "react";
import {IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Button, Box, Spacer, Link} from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CoinvaultLogo from "./CoinVaultLogo";
import ProfileIcon from "./ProfileIcon";

const Burgermenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {/* ─── Hamburger Icon (only on mobile) ─── */}
      <IconButton
        aria-label="Open burger menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        ml="1rem"
      />

      {/* ─── Drawer that slides in from the right ─── */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

         
          <DrawerHeader
            borderBottom="1px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px="1rem"
            pr="3rem"        
          >
            {/* Left‐side: Logo */}
            <Box
              cursor="pointer"
              onClick={() => {
                navigate("/");
                onClose();
              }}
            >
              <CoinvaultLogo boxSize="6rem" />
            </Box>

            
            <Spacer />

            {/* 
              Enten ProfileIcon (hvis logged ind) 
              Eller “Sign Up” knap (hvis ikke). 
            */}
            {user ? (
              <ProfileIcon
                boxSize={7}
                color="iconColor"
                cursor="pointer"
                onClick={() => {
                  navigate("/editprofile");
                  onClose();
                }}
              />
            ) : (
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  navigate("/signup");
                  onClose();
                }}
              >
                Sign Up
              </Button>
            )}
          </DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={4} mt="1rem" mb="2rem">
              {/* Home */}
              <Button
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                rightIcon={<ChevronRightIcon boxSize={4} />}
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
              >
                Home
              </Button>

              {/* Crypto Currencies */}
              <Button
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                rightIcon={<ChevronRightIcon boxSize={4} />}
                onClick={() => {
                  navigate("/cryptocurrencies");
                  onClose();
                }}
              >
                Crypto Currencies
              </Button>

              {/* Learn */}
              <Button
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                rightIcon={<ChevronRightIcon boxSize={4} />}
                onClick={() => {
                  navigate("/learn");
                  onClose();
                }}
              >
                Learn
              </Button>

              {/* Favourites (only if logged in) */}
              {user && (
                <Button
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  rightIcon={<ChevronRightIcon boxSize={4} />}
                  onClick={() => {
                    navigate("/favourites");
                    onClose();
                  }}
                >
                  Favourites
                </Button>
              )}
              {/* {user?.role === "admin" && (
                        <Link
                          fontWeight={isActive("/admin") ? "bold" : "normal"}
                          textDecoration={isActive("/admin") ? "underline" : "none"}
                          onClick={() => navigate("/admin")}
                          _hover={{ textDecoration: "underline" }}
                          cursor="pointer"
                        >
                          Admin
                        </Link>
                )} */}
            </VStack>

            {/* Push the logout/sign‐in buttons to the bottom */}
            <Box flex="1" />

            <VStack spacing={4} width="100%" mb="2rem">
              {user ? (
                <Button
                  width="100%"
                  colorScheme="red"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    width="100%"
                    colorScheme="blue"
                    onClick={() => {
                      navigate("/signup");
                      onClose();
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    width="100%"
                    colorScheme="blue"
                    onClick={() => {
                      navigate("/login");
                      onClose();
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Burgermenu;
