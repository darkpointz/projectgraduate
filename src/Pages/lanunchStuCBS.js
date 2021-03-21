import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";

export default function LanunchStuCBS() {
  // const [state, setstate] = useState();
  // let params = useParams();
  // useEffect(() => {
  // firebase
  //   .firestore()
  //   .collection("Report")
  //   .doc(params.reportId)
  //   .onSnapshot((doc) => {
  //     doc.data().quiz.forEach((data) => {
  //       if (data.active === true) {
  //         console.log("Current data: ", data);
  //       }
  //     });
  //     // console.log("Current data: ", doc.data().quiz);
  //   });
  // }, []);
  // return <div></div>;

  const [state, setstate] = useState();
  const [question, setquestion] = useState();
  let params = useParams();
  useEffect(() => {
    const formStudent = {
      reportId: params.reportId,
      stuid: params.stuid,
    };
    console.log(formStudent);
    reportService.getQuizPrivateRoomByStudent(formStudent).then((res) => {
      if (res === "CBT") {
        firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            setquestion();
            doc.data().quiz.forEach((data) => {
              if (data.active === true) {
                setquestion(data.question);
                console.log("Current data---------------: ");
                console.log("Current data: ", question);
                setstate(data);
              }
            });
          });
      } else setstate(res);
    });
  }, []);
  return <div></div>;
}

///-----
