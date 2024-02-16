import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import MainContainer from "./components/containers/MainContainer";
import MessagesContainer from "./components/containers/MessagesContainer";
import SideBar from "./components/sidebar/SideBar";
import Users from "./components/users/Users";
function App() {
  return (
    <MainContainer>
      <SideBar />
      <Users />
      <MessagesContainer />
    </MainContainer>
  );
}

export default App;
