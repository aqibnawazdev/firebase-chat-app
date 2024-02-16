import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid } from "@mui/material";
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
      sx={(theme) => ({
        borderRadius: "18px",
      })}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Grid>
  );
}

export default SideBarContainer;
