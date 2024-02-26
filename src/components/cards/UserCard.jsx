import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import moment from "moment";
function UserCard({
  user,
  id,
  message,
  userName,
  photoURL,
  chatid,
  seen,
  updatedAt,
  messagesLength,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={photoURL || "./images/user-billgate.png"}
          />
        }
        title={userName}
        subheader={message}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {seen ? (
          <Avatar
            src="./images/tick-double.png"
            sx={{ width: 18, height: 18 }}
          />
        ) : (
          <>
            <Typography variant="subtitle2" component={"span"}>
              {moment(updatedAt.toDate()).calendar()}
            </Typography>
            <Badge
              badgeContent={messagesLength}
              color="secondary"
              sx={{ marginTop: 2 }}
            />
          </>
        )}
      </Box>
    </Card>
  );
}

export default UserCard;
