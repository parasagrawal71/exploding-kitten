import { GET_USER, GET_LEADERBOARD, SAVE_WON_GAME } from "./types";
import request from "../../apis/request";
import { readCookie } from "../../utils/cookie";

export const getUserData = () => async (dispatch) => {
  const username = readCookie("username");
  if (!username) {
    dispatch({
      type: GET_USER,
      payload: {},
    });
  }

  const response = await request(`/users/${username}`, "GET");

  dispatch({
    type: GET_USER,
    payload: response?.data,
  });
};

export const getUsers = () => async (dispatch) => {
  const response = await request(`/users`, "GET");

  dispatch({
    type: GET_LEADERBOARD,
    payload: response?.data,
  });
};

export const editUserData = (reqBody) => async (dispatch) => {
  const username = readCookie("username");
  if (!username) {
    dispatch({
      type: SAVE_WON_GAME,
      payload: {},
    });
  }

  const response = await request(`/users/${username}`, "PUT", reqBody);
  console.log("response", response);
  dispatch({
    type: SAVE_WON_GAME,
    payload: response?.data,
  });
};
