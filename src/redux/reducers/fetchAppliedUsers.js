import { types } from '../actions/fetchAppliedUsers';

const initialState = {
  fetchAppliedUsersSuccessful: false,
  fetchAppliedUsersFailure: false,
  appliedUsers: [],
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.FETCH_APPLED_USERS_FAILURE: return { ...initialState, fetchAppliedUsersFailure: true };
    case types.FETCH_APPLIED_USERS_SUCCESSFUL: {
      return {
        ...state,
        fetchAppliedUsersSuccessful: true,
        appliedUsers: state.appliedUsers.concat({ jobId: action.payload.jobId, applicants: action.payload.value }),
      };
    }
    default: return state;
  }
};
