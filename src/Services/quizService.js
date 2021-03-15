import axios from "axios";

export const quizService = {
  getAllQuiz,
  insertQuiz,
};

function getAllQuiz(uId) {
  return axios
    .get(`/quiz/getAllQuiz/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertQuiz(formquiz, uId) {
  return axios
    .post(`/quiz/insertQuiz/${uId}`, formquiz)
    .then((res) => {
      console.log("message: ", res.data.message);
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
