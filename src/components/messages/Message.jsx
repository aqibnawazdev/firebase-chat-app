import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import moment from "moment";
function Message({ currUserId, message }) {
  return (
    <Stack
      sx={{
        width: "fit-content",
        alignSelf: message.sender == currUserId ? "end" : "start",
        margin: 2,
      }}
    >
      <Typography
        variant="p"
        component="p"
        backgroundColor="#6E00FF"
        sx={(theme) => ({
          padding: "10px",
          borderRadius: theme.shape.borderRadius,
          paddingLeft: "20px",
          paddingRight: "20px",
          color: "white",
        })}
      >
        {message.body}
      </Typography>
      <Typography
        variant="caption"
        sx={{ marginLeft: "10px", marginTop: "5px" }}
      >
        {moment(message?.sendAt.toDate()).calendar()}
      </Typography>
    </Stack>
  );
}

export default Message;
