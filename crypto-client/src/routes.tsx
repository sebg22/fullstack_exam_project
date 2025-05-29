// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";  
import EditProfile from "./pages/EditProfile";  
import Login from "./pages/Login";  
import Coin from "./pages/Coin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },              // GET “/”
      { path: "editProfile", element: <EditProfile /> },   // GET “/edit-profile”
      { path: "login", element: <Login /> },               // GET “/login”
      { path: "coin/:id", element: <Coin /> },             // GET “/coin/:id”
    ],
  },
]);

export default router;
