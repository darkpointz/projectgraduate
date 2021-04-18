import axios from "axios";
import { httpClient } from "../Auth/axiosInterceptor";

export const classService = {
  getAllRoom,
  insertRoom,
  deleteRoomByRoomId,
  getRoomById,
  insertStudentByRoomId,
  deleteStudentByRoomId,
  changeRoomName,
};

function getAllRoom(uId) {
  return httpClient
    .get(`/room/getAllRoom/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertRoom(formroom, userId) {
  return httpClient.post(`/room/insertRoom/${userId}`, formroom).then((res) => {
    return res;
  });
}

function insertStudentByRoomId(formStudent, roomId) {
  return httpClient
    .put(`/room/insertStudentByRoomId/${roomId}`, formStudent)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function deleteRoomByRoomId(roomId) {
  return httpClient
    .delete(`/room/deleteRoomByRoomId/${roomId}`)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function deleteStudentByRoomId(roomId, stuid) {
  return httpClient
    .delete(`/room/deleteStudentByRoomId/${roomId}/${stuid}`)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getRoomById(roomId) {
  return httpClient
    .get(`/room/getRoomById/${roomId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function changeRoomName(roomId, formName) {
  return httpClient
    .put(`/room/changeRoomName/${roomId}`, formName)
    .then((res) => {
      return res;
    });
}
