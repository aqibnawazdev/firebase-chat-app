import React, { useContext, useEffect, useRef, useState } from "react";
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
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function Messages() {
  const [message, setMessage] = useState("");
  const [allChat, setAllChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { selectedUser, chat } = useContext(AuthContext);

  const ref = useRef(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
      }
    });
    return () => unsub();
  }, [chat]);

  // useEffect(() => {
  //   if (chat?.messages.length) {
  //     ref.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //     });
  //   }
  // }, [chat?.messages?.length]);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    try {
      const docuRef = collection(db, "chats");

      console.log("selecteduserId", selectedUser.userId);
      console.log("Current userId", currentUser.uid);

      const q = query(
        docuRef,
        where("users", "array-contains", selectedUser.userId)
      );
      let chatId =
        currentUser.uid > selectedUser.userId
          ? currentUser.uid + selectedUser.userId
          : selectedUser.userId + currentUser.uid;

      const q2 = query(docuRef, where("conversationId", "==", chatId));
      await getDocs(q2).then(async (docSnap) => {
        console.log("empty", docSnap.empty);
        if (docSnap.empty) {
          await addDoc(docuRef, {
            users: [currentUser.uid, selectedUser.userId],
            conversationId:
              currentUser.uid > selectedUser.userId
                ? currentUser.uid + selectedUser.userId
                : selectedUser.userId + currentUser.uid,
            createdAt: new Date(),
            messages: [
              {
                sender: currentUser.uid,
                receiver: selectedUser.userId,
                body: message,
                seen: false,
                sendAt: new Date(),
              },
            ],
          });
        } else {
          docSnap.docs.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              messages: arrayUnion({
                sender: currentUser.uid,
                receiver: selectedUser.userId,
                body: message,
                seen: false,
                sendAt: new Date(),
              }),
            });
          });
        }
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
        {chat &&
          chat?.messages.map((m, i) => (
            <Message key={m.sendAt} currUserId={currentUser.uid} message={m} />
          ))}
        <div ref={ref} />
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

// const { userId } = selectedUser;
// const docRef = collection(db, "chats");
// const q = query(docRef, where("users", "array-contains", user.uid));
// const unsub = onSnapshot(q, async (snap) => {
//   if (snap.empty) {
//     await addDoc(docRef, {
//       users: [userId, user.uid],
//       createdAt: new Date(),
//       messages: [],
//     });
//   } else {
//     const data = snap.docs.map((doc) => ({
//       ...doc.data(),
//       docId: doc.id,
//     }));
//     dispatch({ type: "CHAT", payload: data[0] });
//   }
// });
