import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.config.js";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});
  const [chat, setChat] = useState(null);
  //User Selection....

  const handleUserSelect = async (selectedUser) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    console.log(selectedUser.userId);
    const { userId } = selectedUser;
    const docRef = collection(db, "chats");
    const q = query(
      docRef,
      where("users", "array-contains", selectedUser.userId)
    );
    const unsub = onSnapshot(q, async (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        const [messages] = data
          ?.filter((c, i) => c.users[1] === user.uid)
          .map((m) => m.messages);

        setChat(messages);
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
