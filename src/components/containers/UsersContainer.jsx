import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid, Paper } from "@mui/material";
function UsersContainer({ children }) {
  return (
    <Grid
      item
      container
      direction={"column"}
      alignContent={"center"}
      xs={4}
      margin={2}
      bgcolor={colorObject.bodyBgPrimary}
      height={"95%"}
      sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
    >
      {children}
    </Grid>
  );
}
export default UsersContainer;
