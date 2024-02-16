import React from "react";
import SideBarContainer from "../containers/SideBarContainer";
import { Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import { Home, MessageRounded } from "@mui/icons-material";
function SideBar() {
  return (
    <SideBarContainer>
      <Grid item marginTop={2}>
        <IconButton>
          <UserAvatar srcPath="./public/images/user-man.png" alt="" />
        </IconButton>
        <Stack marginTop={2}>
          <IconButton>
            <img src="/images/home.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/messages.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/bx_bell.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/ci_settings.png" width={35} alt="" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item marginBottom={2}>
        <IconButton>
          <img src="/images/logout.png" width={35} alt="" />
        </IconButton>
      </Grid>
    </SideBarContainer>
  );
}

export default SideBar;
