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
      xs={2}
      margin={1}
      bgcolor={colorObject.bodyBgPrimary}
      height={"100vh"}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        marginLeft: "0px",
        marginRight: "0px",
      })}
    >
      {children}
    </Grid>
  );
}
export default UsersContainer;
