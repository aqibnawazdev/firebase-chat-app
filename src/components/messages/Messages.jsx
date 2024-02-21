import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MessagesContainer from "../containers/MessagesContainer";
import "../../index.css";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { AuthContext } from "../../context/AuthContext";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function Messages() {
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState(null);
  const { selectedUser, chat } = useContext(AuthContext);
  const [currUserId, setCurrUserId] = useState(null);
  console.log("chat", chat);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrUserId(uid);
      } else {
      }
    });
    return () => unsub();
  }, [chat]);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "chats", chat.docId);
      await updateDoc(docRef, {
        messages: arrayUnion({
          sender: currUserId,
          receiver: selectedUser.userId,
          body: message,
          seen: false,
          sendAt: new Date(),
        }),
      });
      // fetchChat();
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MessagesContainer>
      <Stack
        direction={"row"}
        spacing="15px"
        sx={{
          width: "100%",
          padding: "10px",
          height: "70px",
          // backgroundColor: "#f3f3f3",
        }}
      >
        <UserAvatar srcPath={selectedUser?.photoURL} />
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontWeight: 600, margin: "0px", padding: "0px" }}
          >
            {selectedUser?.displayName}
          </Typography>
          <Typography variant="caption">{selectedUser?.status}</Typography>
        </Box>
      </Stack>
      <Box
        component="div"
        sx={{ width: "100%", height: ".5px", backgroundColor: "#B4ABAB" }}
      ></Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "800px",
          overflow: "auto",
        }}
      >
        {chat?.messages?.map((m) => (
          <Message key={m.body} currUserId={currUserId} message={m} />
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={(e) => handleMessageSent(e)}
        sx={formStyles}
      >
        <IconButton sx={{ p: "10px" }} aria-label="attach-file">
          <AttachFileIcon />
        </IconButton>
        <InputBase
          placeholder="Type you message here..."
          inputProps={{ "aria-label": "Type you message here..." }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton
          type="submit"
          aria-label="search"
          sx={{ marginLeft: "auto" }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </MessagesContainer>
  );
}

export default Messages;

var formStyles = {
  width: "40%",
  backgroundColor: "#EFF6FC",
  position: "fixed",
  bottom: "20px",
  borderRadius: "17px",
  padding: "0px",
  paddingRight: "10px",
  display: "flex",
  marginBottom: "10px",
  marginLeft: "20px",
  height: "40px",
};
