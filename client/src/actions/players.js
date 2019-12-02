import axios from 'axios';
import { GET_PLAYERS, PLAYERS_ERROR, REGISTER_PLAYER } from './types';
import { setAlert } from './alert';
// GET players from api
export const getPlayers = () => async dispatch => {
  try {
    const res = await axios.get('/api/players');
    dispatch({
      type: GET_PLAYERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PLAYERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Create player
export const addPlayer = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/players', formData, config);

    dispatch({
      type: REGISTER_PLAYER,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Player profile updated' : 'Player added successfully!')
    );

    if (!edit) {
      history.push('/players');
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PLAYERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
