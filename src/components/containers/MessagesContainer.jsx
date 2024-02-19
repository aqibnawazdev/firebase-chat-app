import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
function MessagesContainer({ children }) {
  return (
    <Paper
      margin={2}
      sx={{
        height: "95%",
        borderRadius: "20px",
        width: "40%",
        margin: "16px",
        position: "relative",
      }}
    >
      <Grid
        item
        container
        direction={"column"}
        margin={1}
        bgcolor={colorObject.bgWhite}
        sx={{ maxWidth: "95%" }}
      >
        {children}
      </Grid>
    </Paper>
  );
}
export default MessagesContainer;
