import SideBar from "../../components/sidebar/SideBar";
import MainContainer from "../containers/MainContainer";
import Users from "../../components/users/Users";
import Messages from "../../components/messages/Messages";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase.config";
export const MainLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
      }
    });
  }, []);

  return (
    <MainContainer>
      <SideBar />
      <Users />
      <Messages />
    </MainContainer>
  );
};
