import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} colorScheme="green" onChange={toggleColorMode} size={{base: "sm", md: "md"}}></Switch>
      <Text fontSize={{base: "sm", md: "md"}}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
