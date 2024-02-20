import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid, Paper } from "@mui/material";
function SideBarContainer({ children }) {
  return (
    <Grid
      item
      container
      margin={2}
      direction={"column"}
      xs={1}
      bgcolor={colorObject.sidebarBgPrimary}
      height={"95%"}
      sx={(theme) => ({ borderRadius: theme.shape.borderRadius })}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Grid>
  );
}

export default SideBarContainer;
