import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => (
  <>
    <NavBar />
    <Box>
      <Outlet />    {/* ← your HomePage or EditProfile will render here */}
    </Box>
  </>
);

export default Layout;
