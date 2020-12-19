import { GET_USER, GET_LEADERBOARD, SAVE_WON_GAME } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_LEADERBOARD:
      return {
        ...state,
        users: action.payload,
      };

    case SAVE_WON_GAME:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
