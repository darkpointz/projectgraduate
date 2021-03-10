import React, { useState, useContext } from "react";
import axios from "axios";
// import { signInWithGoogle, logout } from "../auth/auth";
import { AuthContext } from "../Auth/auth";
import { auth, provider } from "../Auth/firebase";
import { Redirect } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  Button,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
// import { UserContext } from "../Contexts/user";

export default function Login() {
  // const [user, setuser] = useContext(AuthContext);
  // const [user, setuser] = useState(initialState);
  const handleClicklogin = async () => {
    await auth
      .signInWithPopup(provider)
      .then((res) => {
        // setuser(res.user);
        var credential = res.credential;
        var token = credential.idToken;
        const FBIdToken = `Bearer ${token}`;
        //localStorage.setItem("FBIdToken", JSON.stringify(FBIdToken));

        axios.defaults.headers.common["Authorization"] = FBIdToken;
        console.log(res.user);
        console.log("idtoken ", FBIdToken);
      })
      .then((idToken) => {})
      .catch((err) => {
        console.log(err.message);
      });
    // // ------
    // // axios.post(`/user/googleSignIn`).then((res) => {
    // //   console.log(res.data);
    // // });
  };

  const logout = async () => {
    await auth
      .signOut()
      .then(() => {
        console.log("logout_sucess");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // const { currentUser } = useContext(AuthContext);
  // if (currentUser) {
  //   return <Redirect to="/" />;
  // }

  // const handleClick = async () => {
  //   // let userBySignIn = await test();
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // user has logged in...
  //       console.log("------------------");
  //       console.log(authUser);
  //       // setUser(authUser);
  //       console.log("user has logged in");
  //     } else {
  //       // user has logged out..
  //       // setUser(null);
  //       console.log("user has logged out");
  //     }
  //   });
  // };

  // const handlelogout = async () => {
  //   let logout_sucess = await logout();
  //   console.log(logout_sucess);
  //   // let userBySignIn = await test();
  // };
  return (
    <div>
      {/* {user ? (
        <>
          <img src={user.photoURL} />
          <Button variant="contained" onClick={handleClick}>
            Signin
          </Button>
          <Button variant="contained" onClick={handlelogout}>
            logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={handleClicklogin}>
            Google Signin
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Signin
          </Button>
        </>
      )} */}
      <Button variant="contained" onClick={handleClicklogin}>
        Google Signin Teacher
      </Button>
      <Button variant="contained" style={{ marginLeft: "20px" }}>
        Login Student
      </Button>
    </div>
  );
}
