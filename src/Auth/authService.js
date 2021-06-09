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
        const FBUserIDtoken = `Bearer ${token}`;
        localStorage.setItem("FBIdToken", FBUserIDtoken);
        // axios.defaults.headers.common["Authorization"] = FBUserIDtoken;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

async function signInWithEmail(email, password) {
  let currentUser;
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
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
    })
    .catch((err) => {
      console.log(err.message);
    });
}
