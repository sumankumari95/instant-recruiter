import axios from 'axios';

export const types = {
  FETCH_APPLIED_JOBS_SUCCESSFUL: 'FETCH_APPLIED_JOBS_SUCCESSFUL',
  FETCH_APPLIED_JOBS_FAILURE: 'FETCH_APPLIED_JOBS_FAILURE',
};

const fetchAppliedJobsSuccess = jobsData => ({
  type: types.FETCH_APPLIED_JOBS_SUCCESSFUL,
  payload: jobsData,
});

const fetchAppliedJobsFailure = () => ({
  type: types.FETCH_APPLIED_JOBS_FAILURE,
});

export const fetchAppliedJobs = userId => (dispatch) => {
  axios.post('http://localhost:4040/fetchAppliedJobs', {
    userId,
  }).then((res) => {
    dispatch(fetchAppliedJobsSuccess(res.data));
  }).catch(() => {
    dispatch(fetchAppliedJobsFailure());
  });
};
