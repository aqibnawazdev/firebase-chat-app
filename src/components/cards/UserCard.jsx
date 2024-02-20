import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { colorObject } from "../../Theme/customColors";
function UserCard({ user }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderBottom: "1px solid #B4ABAB",
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
            src={user?.photoURL || "./images/user-billgate.png"}
          />
        }
        title={user?.displayName || "test"}
        subheader={user ? user?.status : "Last message"}
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
        {user ? (
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
        )}
      </Box>
    </Card>
  );
}

export default UserCard;
