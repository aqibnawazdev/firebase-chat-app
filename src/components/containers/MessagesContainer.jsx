import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
function MessagesContainer({ children }) {
  return (
    <Paper
      margin={2}
      sx={(theme) => ({
        height: "97%",
        borderRadius: theme.shape.borderRadius + 2,
        width: "50%",
        margin: "12px 0px",
        paddingLeft: "0px",
        position: "relative",
        overflow: "hidden",
      })}
    >
      <Grid
        item
        container
        direction={"column"}
        bgcolor={colorObject.bgWhite}
        sx={{ width: "100%", marginLeft: "0px", padding: "0px" }}
      >
        {children}
      </Grid>
    </Paper>
  );
}
export default MessagesContainer;
