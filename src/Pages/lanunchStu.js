import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
export default function LanunchStu() {
  const [state, setstate] = useState();
  useEffect(() => {
    const formStudent = {
      roomName: "Com",
      stuid: "02",
    };

    reportService.getQuizByStudent(formStudent).then((res) => {
      setstate(res);
      console.log(res);
    });
  }, [state]);
  return <div></div>;
}
