import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.config.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});

  //User Selection....
  const handleUserSelect = async (selectedUser) => {
    const { userId } = selectedUser;
    const docRef = doc(db, "chats", userId);

    dispatch({ type: "SELECT_USER", payload: selectedUser });
    const unsub = onSnapshot(doc(db, "chats", userId), async (snap) => {
      const data = snap.data();
      if (!data) {
        await setDoc(docRef, {
          users: [userId, user.uid],
          createdAt: new Date(),
          messages: [],
        });
      } else {
        dispatch({ type: "CHAT", payload: data });
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
        chat: state.chat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
