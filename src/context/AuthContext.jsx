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
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});
  const [docId, setDocId] = useState(null);
  //User Selection....
  const handleUserSelect = async (selectedUser) => {
    const { userId } = selectedUser;
    const docRef = collection(db, "chats");
    const q = query(docRef, where("users", "array-contains", user.uid));
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    const unsub = onSnapshot(q, async (snap) => {
      console.log(snap.empty);
      if (snap.empty) {
        await addDoc(docRef, {
          users: [userId, user.uid],
          createdAt: new Date(),
          messages: [],
        });
      } else {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        dispatch({ type: "CHAT", payload: data[0] });
      }

      // if (!data)
      // }
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
