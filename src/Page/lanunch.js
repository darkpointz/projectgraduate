import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Lanunch() {
  const [report, setreport] = useState([]);

  const logtest = () => {
    firebase
      .firestore()
      .collection("Report")
      .where("roomId", "==", "02")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //   cities.push(doc.data());
          setreport(doc.data());
        });
        console.log("Current cities in CA: ", report);
      });
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("Report")
      .where("roomId", "==", "ST0maGjuR46cCOZwGoMR")
      .where("finish", "==", true)
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //   cities.push(doc.data());
          setreport(doc.data());
        });
        console.log("Current cities in CA: ", report);
      });
  }, []);
  return <div>Lanunch</div>;
}
