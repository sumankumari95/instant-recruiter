import axios from 'axios';

export const types = {
  FETCH_JOBS_STARTED: 'FETCH_JOB_POSTS_STARTED',
  FETCH_JOBS_SUCCESSFUL: 'FETCH_JOB_POSTS_SUCCESSFUL',
  FETCH_JOB_POSTS_ERROR: 'FETCH_JOB_POSTS_ERROR',
};

const fetchJobPostsStarted = () => ({
  type: types.FETCH_JOBS_STARTED,
});

const fetchJobPostsError = () => ({
  type: types.FETCH_JOB_POSTS_ERROR,
});

const fetchJobPostsSuccessful = jobId => ({
  type: types.FETCH_JOBS_SUCCESSFUL,
  payload: jobId,
});

export const fetchJobs = () => (dispatch) => {
  dispatch(fetchJobPostsStarted());
  axios.get('/fetchAllJobPosts').then((res) => {
    if (res.data) { dispatch(fetchJobPostsSuccessful(res.data)); }
  }).catch(() => {
    dispatch(fetchJobPostsError());
  });
};
