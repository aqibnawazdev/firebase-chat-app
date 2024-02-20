import React, { useContext } from "react";
import SideBarContainer from "../containers/SideBarContainer";
import { Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import { Home, MessageRounded } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully..");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SideBarContainer>
      <Grid item marginTop={2}>
        <IconButton>
          <UserAvatar srcPath={user.photoURL} alt="" />
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
        <IconButton onClick={handleLogout}>
          <img src="/images/logout.png" width={35} alt="" />
        </IconButton>
      </Grid>
    </SideBarContainer>
  );
}

export default SideBar;
