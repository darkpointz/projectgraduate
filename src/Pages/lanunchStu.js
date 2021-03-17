import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
export default function LanunchStu() {
  useEffect(() => {
    let fromStudent = {
      roomName: "Com",
      stuid: "01",
    };

    reportService.getQuizByStudent(fromStudent).then((res) => {
      console.log(res);
    });
  }, []);
  return <div></div>;
}
