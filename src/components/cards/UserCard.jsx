import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { colorObject } from "../../Theme/customColors";
function UserCard({ badge }) {
  return (
    <Card
      elevation={false}
      sx={{
        borderBottom: "1px solid #B4ABAB",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe" src="./images/user-billgate.png" />}
        title="Bill Gate"
        subheader="last message"
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
        <Typography variant="subtitle2" component={"span"}>
          Today, 9:00pm
        </Typography>
        {badge ? (
          <Badge badgeContent={2} color="secondary" sx={{ marginTop: 2 }} />
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
