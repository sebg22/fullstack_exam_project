// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
};

// 3. extend the theme
const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      cardBg: {
        default: "white",
        _dark: "gray.800",
      },
      inputBg: {
        default: "gray.100",
        _dark: "gray.700",
      },
      socialBg: {
        default: "gray.50",
        _dark: "gray.700",
      },
      divider: {
        default: "gray.300",
        _dark: "gray.600",
      },
      text: {
        default: "gray.600",
        _dark: "gray.400",
      },
      button: {
        default: "blue.500",
        _dark: "blue.300",
      },
    },
  },
});

export default theme;
