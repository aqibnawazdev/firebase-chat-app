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

  const handleUserSelect = async (selectedUser, chatId) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    console.log("selectedUserId ", selectedUser.userId);
    setChat(null);
    // console.log("docId ", docId);
    if (!chatId) {
      const conversationId =
        user.uid > selectedUser.userId
          ? user.uid + selectedUser.userId
          : selectedUser.userId + user.uid;
      const collRef = collection(db, "chats");
      const chatQuery = query(
        collRef,
        where("conversationId", "==", conversationId)
      );
      // const docRef = doc(db, "chats", docId);
      const unsub = onSnapshot(chatQuery, async (snap) => {
        snap.docs.forEach((d) => {
          const data = d.data();
          setChat(data);
        });
      });
    } else {
      const collRef = collection(db, "chats");
      const chatQuery = query(collRef, where("conversationId", "==", chatId));
      // const docRef = doc(db, "chats", docId);

      const unsub = onSnapshot(chatQuery, async (snap) => {
        snap.docs.forEach((d) => {
          const data = d.data();
          setChat(data);
        });
      });
    }

    const { userId } = selectedUser;
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
