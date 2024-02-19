import React from "react";
import UsersContainer from "../containers/UsersContainer";
import { Grid, Typography, Stack, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { colorObject } from "../../Theme/customColors";
import Divider from "@mui/material/Divider";
import {
  fontFamilies,
  typography,
} from "../../Theme/Components-Theme/typography";
import UserCard from "../cards/UserCard";
function Users() {
  return (
    <UsersContainer>
      <Grid item>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            width: 370,
            marginBottom: 4,
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: fontFamilies.Roboto }}
            placeholder="Search "
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "start",
            borderRadius: "20px",
            width: 370,
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography variant="h3" component={"h2"} fontWeight={600}>
            People
          </Typography>
          <UserCard />
          <UserCard badge={true} />
          <UserCard badge={false} />
          <UserCard badge={true} />
        </Paper>
      </Grid>
    </UsersContainer>
  );
}

export default Users;
