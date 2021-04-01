import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

import {
  makeStyles,
  Paper,
  IconButton,
  FormControl,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import {
  Public,
  Lock,
  AccountBox,
  Delete,
  EditTwoTone,
} from "@material-ui/icons";

export default function ShowReportByReportId() {
  let params = useParams();
  const [report, setreport] = useState([]);

  useEffect(() => {
    reportService.getReportByReportId(params.reportId).then((res) => {
      console.log(res);
    });
  }, []);
  return <div></div>;
}
