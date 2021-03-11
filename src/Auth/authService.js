import React, { useState, useEffect, createContext } from "react";
import { auth, provider } from "./firebase";
import axios from "axios";

export const AuthContext = createContext();

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

      // axios.defaults.headers.common["Authorization"] = FBIdToken;
      // console.log(res.user);
      // console.log("idtoken ", FBIdToken);
    })
    .then((idToken) => {})
    .catch((err) => {
      console.log(err.message);
    });
  await auth.currentUser
    .getIdToken(true)
    .then((token) => {
      console.log("tokensdsdsdddd:", token);
      localStorage.setItem("FBIdToken", token);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

async function logout() {
  await auth
    .signOut()
    .then(() => {
      console.log("logout_sucess");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

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
