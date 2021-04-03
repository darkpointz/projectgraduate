import axios from "axios";
import { httpClient } from "../Auth/axiosInterceptor";
export const userService = {
  register,
  signInWithEmail,
};

function register(formRegister) {
  return axios
    .post(`/user/register`, formRegister)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function signInWithEmail(formUser) {
  return axios
    .post(`/user/signInWithEmail`, formUser)
    .then((res) => {
      console.log("+++-----+++");
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
