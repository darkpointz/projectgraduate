import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from "../Auth/auth";

export default function Lanunch() {
  const [report, setreport] = useState([]);
  // const [currentUser, setcurrentUser] = useContext();
  // const [user, setuser] = useContext(AuthContext).currentUser;
  const { currentUser } = useContext(AuthContext);
  // const logtest = () => {
  //   firebase
  //     .firestore()
  //     .collection("Report")
  //     .where("roomId", "==", "02")
  //     .onSnapshot(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         //   cities.push(doc.data());
  //         setreport(doc.data());
  //       });
  //       console.log("Current cities in CA: ", report);
  //     });
  // };
  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        console.log("sdfsdfL: ", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }, []);
  return (
    <div>
      Lanunch--
      {currentUser.displayName}
      {console.log("currentUser: ", currentUser)}
    </div>
  );
}
