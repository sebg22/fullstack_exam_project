// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
// import "./main.css";

import theme from "./theme";
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* Hydrate color-mode on first paint */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      {/* Drives all your pages per src/routes.tsx */}
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
