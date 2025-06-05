import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => (
  <>
    <NavBar />
    <Box p={4}>
      <Outlet />    {/* ← Pages bliver renderet her. */}
    </Box>
  </>
);

export default Layout;
