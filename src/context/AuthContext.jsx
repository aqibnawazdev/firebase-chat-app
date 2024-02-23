import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.config.js";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});
  const [chat, setChat] = useState(null);
  //User Selection....

  const handleUserSelect = async (selectedUser, docId) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    console.log("selectedUserId ", selectedUser.userId);
    // console.log("docId ", docId);
    const { userId } = selectedUser;
    const docRef = doc(db, "chats", docId);
    // const q = query(
    //   docRef,
    //   where("users", "array-contains", selectedUser.userId)
    // );
    // const docQuery = query(docRef, where("docId", "==", docId));
    const unsub = onSnapshot(docRef, async (snap) => {
      console.log(snap.data());
      if (!snap.empty) {
        const data = snap.data();
        // const [messages] = data
        //   ?.filter((c, i) => c.users[1] === user.uid)
        //   .map((m) => m.messages);
        // console.log("chat Data ", data);
        setChat(data);
      }
    });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
      }
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUserSelect,
        selectedUser: state.selectedUser,
        chat: chat,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
