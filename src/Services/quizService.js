import axios from "axios";
import { httpClient } from "../Auth/axiosInterceptor";

export const quizService = {
  getAllQuiz,
  getAllQuizzes,
  getAllQuickQuestion,
  insertQuiz,
  getQuizByQuizId,
  editQuiz,
  deleteQuizByQuizId,
};

function getAllQuiz(uId) {
  return httpClient
    .get(`/quiz/getAllQuiz/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getAllQuizzes(uId) {
  return httpClient
    .get(`/quiz/getAllQuizzes/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getAllQuickQuestion(uId) {
  return httpClient
    .get(`/quiz/getAllQuickQuestion/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getQuizByQuizId(quizId) {
  return httpClient
    .get(`/quiz/getQuizByQuizId/${quizId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertQuiz(formquiz, uId) {
  return httpClient
    .post(`/quiz/insertQuiz/${uId}`, formquiz)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function editQuiz(formquiz, quizId, userId) {
  return httpClient
    .post(`/quiz/editQuiz/${quizId}/${userId}`, formquiz)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function deleteQuizByQuizId(quizId) {
  return httpClient
    .delete(`/quiz/deleteQuizByQuizId/${quizId}`)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
