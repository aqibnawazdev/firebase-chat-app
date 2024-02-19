import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function Message({ userId, message }) {
  return (
    <Stack
      sx={{
        width: "fit-content",
        alignSelf: "end",
        margin: 2,
      }}
    >
      <Typography
        variant="p"
        component="p"
        backgroundColor="#6E00FF"
        sx={{
          padding: "10px",
          borderRadius: "30px",
          paddingLeft: "20px",
          paddingRight: "20px",
          color: "white",
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
  );
}

export default Message;
