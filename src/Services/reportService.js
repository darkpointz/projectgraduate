import { httpClient } from "../Auth/axiosInterceptor";

export const reportService = {
  insertReport,
  getRoomTypeByStudent,
  insertStudentByPublicRoom,
  manageStudentByPrivateRoom,
  getQuizByStudent,
  answerByStudent,
  resultTeacher,
  teacherNextStepCBT,
  teacherStartQuiz,
  teacherFinishQuiz,
  getAllReport,
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

function manageStudentByPrivateRoom(formStudent, reportId) {
  return httpClient
    .post(`/report/manageStudentByPrivateRoom/${reportId}`, formStudent)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
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
      return res.data;
    })
    .catch((err) => {
      console.log("err, ", err);
    });
}

function teacherStartQuiz(reportId) {
  return httpClient
    .post(`/report/teacherStartQuiz/${reportId}`)
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
