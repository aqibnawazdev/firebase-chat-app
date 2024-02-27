import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const storage = getStorage();

  const showToastMessage = (message) => {
    if (message === "Registered sucessfully...") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else if (message === "Please wait, while registering..!!!") {
      toast.loading(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };
  const { user } = React.useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name").replaceAll(" ", "").toLowerCase();
    const file = data.get("profile-pic");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      showToastMessage("Please wait, while registering..!!!");
      const userData = res.user;
      if (userData) {
        const metadata = {
          contentType: file.type,
        };
        const storageRef = ref(storage, "images/" + name);
        await uploadBytesResumable(storageRef, file, metadata).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(userData, {
              displayName: name,
              photoURL: downloadURL,
            });
            const docRef = doc(db, "users", userData.uid);
            await setDoc(docRef, {
              userId: userData.uid,
              displayName: name,
              email: email,
              photoURL: userData?.photoURL,
              timeStamp: serverTimestamp(),
            });
          });
        });

        showToastMessage("Registered sucessfully...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.message;
      showToastMessage(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <ToastContainer />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="text"
                  id="name"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="profile-pic"
                  type="file"
                  id="file"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
