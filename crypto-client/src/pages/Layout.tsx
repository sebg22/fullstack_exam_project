import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => (
  <>
    <NavBar />
    <Box padding={5}>
      <Outlet />    {/* ← your HomePage or EditProfile will render here */}
    </Box>
  </>
);

export default Layout;
