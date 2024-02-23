import React, { useContext, useEffect, useRef, useState } from "react";
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
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
function Users() {
  const [searchUser, setSearchUser] = useState("");
  const [availableUser, setAvailableUser] = useState(null);
  const [search, setSearch] = useState(false);
  const [err, setErr] = useState(null);
  const [conversation, setConversations] = useState(null);
  const { user, handleUserSelect, chat, dispatch } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(null);
  const userRef = collection(db, "users");
  const searchQuery = query(userRef, where("displayName", "==", searchUser));

  //Handle Search
  const populate = [];
  const fetchConversations = (currUserId) => {
    const docRef = collection(db, "chats");
    const q = query(docRef, where("users", "array-contains", currUserId));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        data.forEach(async (d) =>
          populate.push({ ...d, users: await getUsersDetail(d.users) })
        );

        // console.log("data: ", data);
        setConversations(populate);
      }
    });
  };
  console.log(conversation);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUserId(uid);
        fetchConversations(uid);
      } else {
      }
    });
    return () => unsub();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(true);

    const snapshot = await getDocs(searchQuery);
    if (snapshot.docs.length === 0) {
      setErr("User Not found..");
    }
    snapshot.docs.forEach((doc) => {
      setAvailableUser(doc.data());
    });
    setSearchUser("");
  };

  const handlesSearchSelect = (selectedUser) => {
    console.log("seledted user", selectedUser);
    handleUserSelect(selectedUser);
  };

  const handleChatUserSelect = async (selectedUser, docId) => {
    const selectedUserId = selectedUser;
    console.log("selected User", selectedUserId);

    const userRef = collection(db, "users");
    const searchQuery = query(userRef, where("userId", "==", selectedUserId));
    const snapshot = await getDocs(searchQuery);
    if (snapshot.docs.length === 0) {
      console.log("User Not found..");
    }
    snapshot.docs.forEach((doc) => {
      handleUserSelect(doc.data(), docId);
    });
  };

  const getUsersDetail = async (id) => {
    console.log("id", id);

    if (currentUserId !== id[0]) {
      const docRef = doc(db, "users", id[0]);
      const userDetails = await getDoc(docRef);
      return userDetails.data();
    } else {
      const docRef = doc(db, "users", id[1]);
      const userDetails = await getDoc(docRef);
      return userDetails.data();
    }
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
        <Grid
          item
          onClick={() => {
            handlesSearchSelect(availableUser), setSearch(false);
          }}
        >
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
              cursor: "pointer",
            }}
          >
            {availableUser ? (
              <UserCard
                photoURL={availableUser?.photoURL}
                userName={availableUser?.displayName}
              />
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
          {conversation &&
            conversation.map((c) => (
              <Box
                component={"div"}
                sx={{ width: "100%", cursor: "pointer" }}
                key={c.docId}
                onClick={(e) => handleChatUserSelect(c.users.userId, c.docId)}
              >
                <UserCard
                  photoURL={c.users.photoURL}
                  userName={c.users.displayName}
                  user={c.users}
                  chatid={c.docId}
                  message={c.messages[c.messages?.length - 1].body}
                />
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

// useEffect(() => {
// const getUser = async () => {
//   const { currentUser } = await getAuth();
//   const displayName = await currentUser.displayName;
//   const getAllUserQuery = await query(
//     userRef,
//     where("displayName", "!=", displayName)
//   );
//   const unsubscribe = onSnapshot(getAllUserQuery, (querySnapshot) => {
//     const users = [];
//     querySnapshot.forEach((doc) => {
//       users.push(doc.data());
//     });
//     setAllUsers(users);
//   });
// };
// getUser();

//   return () => {};
// }, []);
