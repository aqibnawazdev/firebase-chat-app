import React, { useContext, useEffect, useState } from "react";
import UsersContainer from "../containers/UsersContainer";
import { Grid, Typography, Stack, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";

import {
  fontFamilies,
  typography,
} from "../../Theme/Components-Theme/typography";
import UserCard from "../cards/UserCard";
import { auth, db } from "../../../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
function Users() {
  const [searchUser, setSearchUser] = useState("");
  const [availableUser, setAvailableUser] = useState(null);
  const [search, setSearch] = useState(false);
  const [err, setErr] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  // console.log("allUsers", allUsers);

  const { user, handleUserSelect } = useContext(AuthContext);
  //User Reference
  const userRef = collection(db, "users");
  const displayName = user.displayName;
  const searchQuery = query(userRef, where("displayName", "==", searchUser));

  useEffect(() => {
    const getUser = async () => {
      const { currentUser } = await getAuth();
      const displayName = await currentUser.displayName;
      const getAllUserQuery = await query(
        userRef,
        where("displayName", "!=", displayName)
      );
      const unsubscribe = onSnapshot(getAllUserQuery, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAllUsers(users);
      });
    };
    getUser();

    return () => {};
  }, [displayName]);

  //Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();

    const snapshot = await getDocs(searchQuery);
    setSearch(true);
    if (snapshot.docs.length === 0) {
      setErr("User Not found..");
    }
    snapshot.docs.forEach((doc) => {
      setAvailableUser(doc.data());
    });
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
      {search && (
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
            {availableUser ? (
              <UserCard user={availableUser} />
            ) : (
              <Typography variant="h1" color="initial">
                {err}
              </Typography>
            )}
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
          {allUsers?.map((user) => (
            <Box
              component={"div"}
              sx={{ width: "100%", cursor: "pointer" }}
              key={user.userId}
              onClick={() => handleUserSelect(user)}
            >
              <UserCard user={user} />
              <Divider
                component="li"
                sx={{ width: "100%", listStyle: "none" }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
    </UsersContainer>
  );
}

export default Users;
