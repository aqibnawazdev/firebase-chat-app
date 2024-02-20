import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config.js";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});

  const handleUserSelect = (selectedUser) => {
    // console.log("reduces", selectedUser);
    dispatch({ type: "SELECT_USER", payload: selectedUser });
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
      value={{ user, handleUserSelect, selectedUser: state }}
    >
      {children}
    </AuthContext.Provider>
  );
};
