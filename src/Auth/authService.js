import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import axios from "axios";
import firebase from "firebase";
import { userService } from "../Services/userService";
import swal from "sweetalert";

export const authService = {
  signInWithGoogle,
  logout,
  signInWithEmail,
};
async function signInWithGoogle() {
  let currentUser, FBIdToken;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      // setuser(res.user);
      currentUser = res.user;
      localStorage.setItem("user", currentUser);
      localStorage.setItem("userId", currentUser.uid);
      // axios.defaults.headers.common["Authorization"] = FBIdToken;

      let formRegister = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        createdAt: currentUser.metadata.creationTime,
      };
      userService.registerUserByGooglesignIn(formRegister);
    })
    .catch((err) => {
      console.log(err.message);
    });
  if (currentUser) {
    await auth.currentUser
      .getIdToken(true)
      .then((token) => {
        console.log("token:", token);
        const FBUserIDtoken = `Bearer ${token}`;
        localStorage.setItem("FBIdToken", FBUserIDtoken);
        // axios.defaults.headers.common["Authorization"] = FBUserIDtoken;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  // userService.registerUserByGooglesignIn(formRegister).then((res) => {
  //   console.log("registerUserByGooglesignIn");
  // });
}

async function signInWithEmail(email, password) {
  let currentUser;
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
      currentUser = res.user;
      localStorage.setItem("user", currentUser);
      localStorage.setItem("userId", currentUser.uid);
    })
    .catch((err) => {
      console.log(err.message);
    });
  await auth.currentUser
    .getIdToken(true)
    .then((token) => {
      console.log("token:", token);
      const FBUserIDtoken = `Bearer ${token}`;
      localStorage.setItem("FBIdToken", FBUserIDtoken);
      // axios.defaults.headers.common["Authorization"] = FBUserIDtoken;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

async function logout() {
  await auth
    .signOut()
    .then(() => {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("FBIdToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("RoomName");
      console.log("logout_sucess");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// ----old---
// import React, { useState, useEffect, createContext } from "react";
// import { auth } from "./firebase";
// import axios from "axios";

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setcurrentUser] = useState(null);
//   const [userToken, setuserToken] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setcurrentUser(user);

//       // var credential = res.credential;
//       // var idtoken = credential.idToken;
//       // setcurrentUser(user);
//       console.log("usesdsdr: ", user);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
