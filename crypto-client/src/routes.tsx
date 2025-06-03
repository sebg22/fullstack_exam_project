// src/routes.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Coin from "./pages/Coin";
import Signup from "./pages/Signup";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },                       // GET “/”
      { path: "editProfile", element: <EditProfile /> },            // GET “/edit-profile”
      { path: "login", element: <Login /> },                        // GET “/login”
      { path: "cryptocurrencies", element: <CryptoCurrencies /> },  // GET “/crypto-currencies”
      { path: "signup", element: <Signup /> },                      // GET “/login”
      { path: "coin/:id", element: <Coin /> },                      // GET “/coin/:id”
      { path: "admin", element: <AdminPage /> },                    // GET “/admin”

    ],
  },
]);

export default router;
