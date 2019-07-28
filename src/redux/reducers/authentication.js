import { types } from '../actions/authentication';

const initialState = {
  authenticationStarted: false,
  authenticated: false,
  usernameError: false,
  invalidPassword: false,
  userData: {},
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.AUTHENTICATION_SUCESS: return { ...initialState, authenticated: true, userData: { ...action.payload } };
    case types.AUTHENTICATION_STARTED: return { ...initialState, authenticationStarted: true };
    case types.AUTHENTICATION_FAILURE:
      if (action.payload === 'Email error') return { ...initialState, usernameError: true };
      if (action.payload === 'Password error') return { ...initialState, invalidPassword: true };
      break;
    case types.LOGOUT: return { ...initialState };
    default: return state;
  }
  return state;
};
