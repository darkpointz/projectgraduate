import axios from "axios";

export const classService = {
  getAllRoom,
  insertRoom,
  deleteRoomByRoomId,
};

function getAllRoom(uId) {
  return axios
    .get(`/room/getAllRoom/${uId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertRoom(formroom, userId) {
  return axios
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
  return axios
    .delete(`/room/deleteRoomByRoomId/${roomId}`)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
