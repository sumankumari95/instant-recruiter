import axios from 'axios';

export const types = {
  AUTHENTICATION_STARTED: 'APP_AUTHENTICATION_STARTED',
  AUTHENTICATION_SUCESS: 'APP_AUTHENTICATION_SUCCESS',
  AUTHENTICATION_FAILURE: 'APP_AUTHENTICATION_FAILURE',
  AUTHENTICATION_ERROR: 'APP_AUTHENTICATION_ERROR',
  LOGOUT: 'APP_LOGOUT',
};

const authenticationStarted = () => ({
  type: types.AUTHENTICATION_STARTED,
});

const authenticationSucess = data => ({
  type: types.AUTHENTICATION_SUCESS,
  payload: { ...data },
});

const authenticationFailure = error => ({
  type: types.AUTHENTICATION_FAILURE,
  payload: error,
});

const authenticationError = () => ({
  type: types.AUTHENTICATION_ERROR,
});

const logout = () => ({
  type: types.LOGOUT,
});

export const checkForAuth = ({ email, password }) => (dispatch) => {
  dispatch(authenticationStarted());
  axios.post('/authenticate', {
    email,
    password,
  }).then((res) => {
    if (res.data.Id) dispatch(authenticationSucess(res.data));
    if (res.data === 'Password error' || res.data === 'Email error') dispatch(authenticationFailure(res.data));
  }).catch(() => {
    dispatch(authenticationError());
  });
};

export const logoutAction = () => (dispatch) => {
  dispatch(logout());
};
