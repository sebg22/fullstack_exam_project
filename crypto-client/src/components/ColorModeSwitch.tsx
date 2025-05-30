import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} size={{ base: 'md', md: 'lg' }} colorScheme="green" onChange={toggleColorMode}></Switch>
      <Text fontSize={{ base: 'md', md: 'lg' }}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
