import axios from "axios";
import { httpClient } from "../Auth/axiosInterceptor";

export const reportService = {
  insertReport,
  insertReportQQ,
  getRoomTypeByStudent,
  insertStudentByPublicRoom,
  manageStudentByPrivateRoom,
  getQuizByStudent,
  answerByStudent,
  resultTeacher,
  teacherNextStepCBT,
  teacherStartQuiz,
  teacherFinishQuiz,
  teacherFinishQuizAndSaveQuickQuestion,
  getAllReport,
  getReportByReportId,
  deleteReportByReportId,
  teacherStartQuickQuestion,
  finishQuizCBS,
  submitAnswerQQ,
  raiseHandStudent,
  scoreStudent,
};

function teacherNextStepCBT(reportId, formStep) {
  return httpClient
    .post(`/report/teacherNextStepCBT/${reportId}`, formStep)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function resultTeacher(reportId) {
  return httpClient
    .post(`/report/checkMethodDelivery/${reportId}`)
    .then((res) => {
      console.log(res.data);
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

function insertReportQQ(uId, formReport) {
  return httpClient
    .post(`/report/insertReportQQ/${uId}`, formReport)
    .then((res) => {
      console.log("message: ", res.data.message);
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getRoomTypeByStudent(room) {
  return httpClient
    .get(`/report/getRoomTypeByStudent/${room}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function insertStudentByPublicRoom(formStudent, reportId) {
  return httpClient
    .post(`/report/insertStudentByPrivateRoom/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function manageStudentByPrivateRoom(stuid, reportId) {
  return axios.get(`/report/manageStudentByPrivateRoom/${reportId}/${stuid}`);
}

function getQuizByStudent(formStudent) {
  return httpClient
    .post(`/report/getQuizByStudent`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function answerByStudent(formStudent, reportId) {
  return httpClient
    .post(`/report/answerByStudent/${reportId}`, formStudent)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function submitAnswerQQ(formStudent, reportId) {
  return httpClient
    .post(`/report/submitAnswerQQ/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function teacherStartQuickQuestion(reportId, formquiz) {
  return httpClient
    .post(`/report/teacherStartQuickQuestion/${reportId}`, formquiz)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function teacherStartQuiz(reportId, formTime) {
  return httpClient
    .post(`/report/teacherStartQuiz/${reportId}`, formTime)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function teacherFinishQuiz(reportId) {
  return httpClient
    .post(`/report/teacherFinishQuiz/${reportId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function teacherFinishQuizAndSaveQuickQuestion(reportId, userId) {
  return httpClient
    .post(`/report/teacherFinishQuizAndSaveQuickQuestion/${reportId}/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function getAllReport(userId) {
  return httpClient
    .get(`/report/getAllReport/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function getReportByReportId(reportId) {
  return httpClient
    .get(`/report/getReportByReportId/${reportId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function deleteReportByReportId(reportId) {
  return httpClient
    .delete(`/report/deleteReportByReportId/${reportId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function finishQuizCBS(formStudent) {
  return httpClient
    .post(`/report/finishQuizCBS`, formStudent)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function raiseHandStudent(formStudent) {
  return httpClient
    .post(`/report/raiseHandStudent`, formStudent)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function scoreStudent(reportId, stuid) {
  return httpClient
    .get(`/report/scoreStudent/${reportId}/${stuid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}
