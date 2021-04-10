import axios from "axios";
import { httpClient } from "../Auth/axiosInterceptor";
export const userService = {
  register,
  getHashPassword,
};

function register(formRegister) {
  return httpClient
    .post(`/user/register`, formRegister)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getHashPassword(formUser) {
  return httpClient
    .post(`/user/getHashPassword`, formUser)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
