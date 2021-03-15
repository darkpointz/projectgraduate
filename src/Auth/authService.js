import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import axios from "axios";
import firebase from "firebase";

export const authService = {
  signInWithGoogle,
  logout,
  // isLogin,
};
async function signInWithGoogle() {
  let currentUser, FBIdToken;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      // setuser(res.user);
      var credential = res.credential;
      var token = credential.idToken;
      const FBUserIDtoken = `Bearer ${token}`;
      currentUser = res.user;
      localStorage.setItem("user", currentUser);
      localStorage.setItem("userId", currentUser.uid);
      // axios.defaults.headers.common["Authorization"] = FBIdToken;
      // console.log(res.user);
      // console.log("idtoken ", FBIdToken);
    })
    .catch((err) => {
      console.log(err.message);
    });
  await auth.currentUser
    .getIdToken(true)
    .then((token) => {
      console.log("tokensdsdsdddd:", token);
      const FBUserIDtoken = `Bearer ${token}`;
      localStorage.setItem("FBIdToken", FBUserIDtoken);
      axios.defaults.headers.common["Authorization"] = FBUserIDtoken;
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
