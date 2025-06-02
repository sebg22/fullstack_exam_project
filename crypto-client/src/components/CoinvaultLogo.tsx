// components/CoinvaultLogo.tsx
import React from "react";
import { Icon, IconProps, useColorModeValue } from "@chakra-ui/react";

export const CoinvaultLogo: React.FC<IconProps> = (props) => {
  // 1. Choose your light/dark colors. 
  //    You can use any Chakra color token or your semanticTokens. 
  //    For example, we’ll pick:
  //      • Light mode: “gray.900”  (a nearly-black for white backgrounds)
  //      • Dark mode:  “whiteAlpha.800” (an off-white for dark backgrounds)
  //
  //    You could also point at a semanticToken you defined in `theme` (e.g. “logoColor”).
  const logoColor = useColorModeValue("gray.600", "whiteAlpha.600");

  return (
    <Icon
      // 2. Inherit props (you can pass boxSize, w, h, etc. from where you call <CoinvaultLogo />)
      {...props}

      // 3. Tell Chakra’s <Icon> to paint everything using `currentColor`
      //    (Icon sets both fill and stroke to currentColor internally unless overridden).
      color={logoColor}

      // 4. Make sure the viewBox is the same 1600×1024 we baked into the SVG
      viewBox="0 0 1600 1024"
    >
      {/* 5. Now just inline the same <rect>, <circle>, <text> nodes but use stroke="currentColor" */}
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
