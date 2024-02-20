import React, { useState } from "react";
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
import { db } from "../../../firebase.config";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
function Users() {
  const [searchUser, setSearchUser] = useState("");
  const [availableUser, setAvailableUser] = useState(null);
  console.log(availableUser);

  const handleSearch = async (e) => {
    e.preventDefault();
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", searchUser));

    const snapshot = await getDocs(q);
    snapshot.docs.forEach((doc) => setAvailableUser(doc.data()));
    setSearchUser("");
  };
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
          onSubmit={(e) => handleSearch(e)}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: fontFamilies.Roboto }}
            placeholder="Search "
            inputProps={{ "aria-label": "search google maps" }}
            type="text"
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser}
          />
        </Paper>
      </Grid>
      {availableUser && (
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
              marginBottom: "10px",
            }}
          >
            <UserCard user={availableUser} />
          </Paper>
        </Grid>
      )}
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
