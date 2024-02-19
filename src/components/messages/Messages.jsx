import React from "react";
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

function Messages() {
  return (
    <MessagesContainer>
      <Stack
        direction={"row"}
        spacing="15px"
        sx={{ width: "100%", padding: "10px" }}
      >
        <UserAvatar srcPath="" />
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
            User 1
          </Typography>
          <Typography variant="caption">online</Typography>
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
        <Message />
        <Stack
          sx={{
            alignSelf: "left",
            color: "#444",
            width: "fit-content",
            margin: 2,
          }}
        >
          <Typography
            variant="p"
            component="p"
            backgroundColor="#E7E7E7"
            sx={{
              padding: "10px",
              borderRadius: "30px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            Messages 1
          </Typography>
          <Typography
            variant="caption"
            sx={{ marginLeft: "10px", marginTop: "5px" }}
          >
            Tody, 12:00 pm
          </Typography>
        </Stack>
      </Box>

      <Box component="form" sx={formStyles}>
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <AttachFileIcon />
        </IconButton>
        <InputBase
          placeholder="Type you message here..."
          inputProps={{ "aria-label": "Type you message here..." }}
        />
        <IconButton
          type="button"
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
