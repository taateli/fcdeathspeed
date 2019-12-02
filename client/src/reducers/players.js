import {
  GET_PLAYERS,
  PLAYERS_ERROR,
  REGISTER_PLAYER,
  GET_PLAYER
} from '../actions/types';

const initialState = {
  players: [],
  player: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false
      };
    case REGISTER_PLAYER:
      return { ...state, players: [payload, ...state.players], loading: false };
    case GET_PLAYER:
      return { ...state, player: payload, loading: false };
    case PLAYERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
