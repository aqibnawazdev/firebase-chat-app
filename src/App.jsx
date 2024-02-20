import { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { auth } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { MainLayout } from "./components/mainLayout/MainLayout";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/passwordreset",
          element: <ForgotPassword />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
