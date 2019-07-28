import { types } from '../actions/postJobRequirement';

const initialState = {
  jobPostStarted: false,
  jobPostError: false,
  jobPostSucessful: false,
  jobId: '',
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.JOB_POST_STARTED: return { ...initialState, jobPostStarted: true };
    case types.JOB_POST_ERROR: return { ...initialState, jobPostError: true };
    case types.JOB_POST_SUCCESSFUL: return { ...initialState, jobPostSucessful: true, jobId: action.payload };
    default: return state;
  }
};
