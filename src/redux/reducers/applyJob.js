import { types } from '../actions/applyJob';

const initialState = {
  jobApplySuccesful: false,
  alreadyApplied: false,
  jobApplyError: false,
  jobsApplied: [],
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.APPLY_JOB_SUCCESSFUL: return { ...initialState, jobApplySuccesful: true, jobsApplied: state.jobsApplied.concat(action.payload) };
    case types.APPLY_JOB_FAILURE: return { ...initialState, jobApplyError: true };
    case types.ALREADY_APPLIED_JOB: return { ...initialState, alreadyApplied: true };
    default: return state;
  }
};
