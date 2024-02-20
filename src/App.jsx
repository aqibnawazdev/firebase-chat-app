import { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import MainContainer from "./components/containers/MainContainer";
import MessagesContainer from "./components/containers/MessagesContainer";
import SideBar from "./components/sidebar/SideBar";
import Users from "./components/users/Users";
import Messages from "./components/messages/Messages";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const AppContainer = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    console.log(user);
    useEffect(() => {
      if (!user.email) {
        navigate("/login");
      }
    }, []);
    return (
      <MainContainer>
        <SideBar />
        <Users />
        <Messages />
      </MainContainer>
    );
  };
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
          element: <AppContainer />,
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
