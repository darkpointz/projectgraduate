import axios from "axios";

export const reportService = {
  insertReport,
  getQuizByStudent,
  getRoomTypeByStudent,
  getQuizPrivateRoomByStudent,
};

function insertReport(uId, formReport) {
  return axios
    .post(`/report/insertReport/${uId}`, formReport)
    .then((res) => {
      console.log("message: ", res.data.message);
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getQuizByStudent(formStudent) {
  return axios
    .post(`/report/getQuizByStudent`, formStudent)
    .then((res) => {
      console.log("message: ", res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
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

function getQuizPrivateRoomByStudent(formStudent) {
  return axios
    .post(`/report/getQuizPrivateRoomByStudent`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}
