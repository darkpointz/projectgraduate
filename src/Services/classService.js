import axios from "axios";

export const classService = {
  getAllRoom,
  insertRoom,
  deleteRoomByRoomId,
};

function getAllRoom() {
  return axios
    .get(`/room/getAllRoom`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function insertRoom(formroom) {
  return axios
    .post(`/room/insertRoom`, formroom)
    .then((res) => {
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
