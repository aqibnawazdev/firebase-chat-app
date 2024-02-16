import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid } from "@mui/material";
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
      sx={(theme) => ({
        borderRadius: "18px",
      })}
    >
      {children}
    </Grid>
  );
}
export default UsersContainer;
