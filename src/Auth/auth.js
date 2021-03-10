import React, { useState, useEffect, createContext } from "react";
import { auth } from "../Auth/firebase";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [userToken, setuserToken] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setcurrentUser(user);

      // var credential = res.credential;
      // var idtoken = credential.idToken;
      // setcurrentUser(user);
      console.log("usesdsdr: ", user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
