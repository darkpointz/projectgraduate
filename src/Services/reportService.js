import axios from "axios";
import { httpClient } from '../Auth/axiosInterceptor'

export const reportService = {
  insertReport,
  getRoomTypeByStudent,
  insertStudentByPublicRoom,
  manageStudentByPrivateRoom,
  getQuizByStudent,
  answerByStudent,
  resultTeacher,
};

function resultTeacher(reportId) {
  console.log("resultTeacher: ,", reportId);
  console.log("resultTeacher: ,", reportId);

  return httpClient
    .post(`/report/checkMethodDelivery/${reportId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertReport(uId, formReport) {
  return httpClient
    .post(`/report/insertReport/${uId}`, formReport)
    .then((res) => {
      console.log("message: ", res.data.message);
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getRoomTypeByStudent(room) {
  return axios
    .get(`/report/getRoomTypeByStudent/${room}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function insertStudentByPublicRoom(formStudent, reportId) {
  return axios
    .post(`/report/insertStudentByPrivateRoom/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function manageStudentByPrivateRoom(formStudent, reportId) {
  return axios
    .post(`/report/manageStudentByPrivateRoom/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function getQuizByStudent(formStudent) {
  return axios
    .post(`/report/getQuizByStudent`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function answerByStudent(formStudent, reportId) {
  return axios
    .post(`/report/answerByStudent/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}
