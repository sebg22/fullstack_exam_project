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
      bg: {
        default: "gray.50",
        _dark: "gray.900",
      },
      footerTextColor: {
        default: "gray.700",
        _dark: "gray.200",
      },
      footerSubTextColor: {
        default: "gray.600",
        _dark: "gray.400",
      },
      footerHoverColor: {
        default: "gray.200",
        _dark: "gray.700",
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
        _dark: "whiteAlpha.800",
      },
      splitSectionButton: {
        default: "black",
        _dark: "whiteAlpha.800",
      },
      shadowColor: {
        default: "blackAlpha.200",
        _dark: "blackAlpha.600",
      },
      splitSection: {
        default: "gray.900",
        _dark: "gray.700",
      },
      splitSectionText: {
        default: "white",
        _dark: "gray.200",
      },
    },
  },
});

export default theme;