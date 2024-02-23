import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
function UserCard({ user, id, message, userName, photoURL, chatid }) {
  console.log(user, "user");
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
            src={user.photoURL || "./images/user-billgate.png"}
          />
        }
        title={user.displayName}
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
        {/* {user ? (
          ""
        ) : user?.badge ? (
          <>
            <Typography variant="subtitle2" component={"span"}>
              Today, 9:00pm
            </Typography>
            <Badge badgeContent={2} color="secondary" sx={{ marginTop: 2 }} />
          </>
        ) : (
          <Avatar
            src="./images/tick-double.png"
            sx={{ width: 18, height: 18 }}
          />
        )} */}
      </Box>
    </Card>
  );
}

export default UserCard;
