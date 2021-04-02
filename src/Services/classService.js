import { httpClient } from "../Auth/axiosInterceptor";

export const classService = {
  getAllRoom,
  insertRoom,
  deleteRoomByRoomId,
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
  return httpClient
    .post(`/room/insertRoom/${userId}`, formroom)
    .then((res) => {
      console.log("message: ", res.data.message);
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
