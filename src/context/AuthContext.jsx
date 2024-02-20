import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(user);
      } else {
      }
    });
    return () => unsub();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
