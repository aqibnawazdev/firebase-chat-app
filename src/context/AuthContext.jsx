import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // console.log("From Global Context Provider: ", user);
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
