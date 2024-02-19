import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import MainContainer from "./components/containers/MainContainer";
import MessagesContainer from "./components/containers/MessagesContainer";
import SideBar from "./components/sidebar/SideBar";
import Users from "./components/users/Users";
import Messages from "./components/messages/Messages";
function App() {
  return (
    <MainContainer>
      <SideBar />
      <Users />
      <Messages />
    </MainContainer>
  );
}

export default App;
