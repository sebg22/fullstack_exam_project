// components/CoinvaultLogo.tsx
import React from "react";
import { Icon, IconProps, useColorModeValue } from "@chakra-ui/react";

export const CoinvaultLogo: React.FC<IconProps> = (props) => {
  const logoColor = useColorModeValue("gray.600", "whiteAlpha.600");

  return (
    <Icon
      {...props}
      color={logoColor}
      viewBox="0 0 1600 1024"
    >
      <g stroke="currentColor" strokeWidth="32" fill="none">
        <rect x="64" y="288" width="448" height="448" rx="64" />
        <circle cx="288" cy="512" r="144" />
      </g>
      <text
    x="295"
    y="580"
    text-anchor="middle"
    font-family="Helvetica, Arial, sans-serif"
    font-size="192"
    fill="currentColor"
  >
    ₿
  </text>
      <text
        x="560"
        y="560"
        fontFamily="Helvetica, Arial, sans-serif"
        fontWeight="bold"
        fontSize="192"
        fill="currentColor"
        paintOrder="stroke"
      >
        coinvault
      </text>
    </Icon>
  );
};
export default CoinvaultLogo;