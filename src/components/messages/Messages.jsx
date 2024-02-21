import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MessagesContainer from "../containers/MessagesContainer";

import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { AuthContext } from "../../context/AuthContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function Messages() {
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState(null);
  const { selectedUser, chat } = useContext(AuthContext);
  const [currUserId, setCurrUserId] = useState(null);

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
      const docRef = doc(db, "chats", selectedUser?.userId);
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
        sx={{ width: "100%", padding: "10px" }}
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
        }}
      >
        {chat?.messages.map((m) => (
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
      <Box backgroundColor="#6E00FF" sx={micIconStyles}>
        <img src="./images/bi_mic-fill.png" alt="" width={20} />
      </Box>
    </MessagesContainer>
  );
}

export default Messages;

var formStyles = {
  width: "80%",
  backgroundColor: "#EFF6FC",
  position: "absolute",
  bottom: 10,
  left: "20px",
  borderRadius: "17px",
  padding: "0px",
  paddingRight: "10px",
  display: "flex",
};
var micIconStyles = {
  position: "absolute",
  bottom: 10,
  right: "80px",
  padding: "7px",
  borderRadius: "10px",
};
