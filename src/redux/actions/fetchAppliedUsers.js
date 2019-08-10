import axios from 'axios';

export const types = {
  FETCH_APPLIED_USERS_SUCCESSFUL: 'FETCH_APPLED_USERS_SUCCESSFUL',
  FETCH_APPLED_USERS_FAILURE: 'FETCH_APPLIED_USERS_FAILURE',
};

const fetchAppliedUsersSuccess = (data, jobId) => ({
  type: types.FETCH_APPLIED_USERS_SUCCESSFUL,
  payload: {
    value: data,
    jobId,
  },
});

const fetchAppliedUsersFailure = () => ({
  type: types.FETCH_APPLED_USERS_FAILURE,
});

export const fetchAppliedUsers = (userId, jobId) => (dispatch) => {
  axios.post('/fetchAppliedUsers', {
    userId,
  }).then((res) => {
    if (res.data) { dispatch(fetchAppliedUsersSuccess(res.data, jobId)); }
  }).catch(() => {
    dispatch(fetchAppliedUsersFailure());
  });
};
