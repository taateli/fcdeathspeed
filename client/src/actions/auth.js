import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './types';

// Login admin
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAILED
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
