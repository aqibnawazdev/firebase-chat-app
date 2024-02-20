import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const user = {
  Name: "",
  photoURL: "",
  userId: "",
};

export const AuthContext = createContext(user);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(user);
      } else {
      }
    });
    () => unsub();
    yfrsaqQ;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
