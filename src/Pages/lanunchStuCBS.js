import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";

export default function LanunchStuCBS() {
  const [state, setstate] = useState();
  let params = useParams();
  useEffect(() => {
    const formStudent = {
      reportId: params.reportId,
      stuid: params.stuid,
    };
    console.log(formStudent);
    reportService.getQuizPrivateRoomByStudent(formStudent).then((res) => {
      setstate(res);
      console.log(res);
    });
  }, []);
  return <div></div>;
}
