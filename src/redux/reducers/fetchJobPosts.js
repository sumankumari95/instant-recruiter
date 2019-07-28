import { types } from '../actions/fetchJobPosts';

const initialState = {
  fetchJobPostsStarted: false,
  fetchJobPostsError: false,
  fetchJobPostsSucessful: false,
  jobPosts: {},
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.FETCH_JOBS_STARTED: return { ...initialState, fetchJobPostsStarted: true };
    case types.FETCH_JOB_POSTS_ERROR: return { ...initialState, fetchJobPostsError: true };
    case types.FETCH_JOBS_SUCCESSFUL: return { ...initialState, fetchJobPostsSucessful: true, jobPosts: action.payload };
    default: return state;
  }
};
