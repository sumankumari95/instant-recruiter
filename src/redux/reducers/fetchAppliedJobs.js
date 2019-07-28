/* eslint-disable no-case-declarations */
import { types } from '../actions/fetchAppliedJobs';

const initialState = {
  fetchAppliedJobsSuccess: false,
  fetchAppliedJobsError: false,
  appliedJobs: [],
};

export default (state = initialState, action = { type: 'null' }) => {
  switch (action.type) {
    case types.FETCH_APPLIED_JOBS_SUCCESSFUL:
      const jobs = [];
      if (action.payload.length) {
        action.payload.forEach(d => jobs.push(d.JobId));
      }
      return {
        ...initialState,
        fetchAppliedJobsSuccess: true,
        appliedJobs: jobs,
      };
    case types.FETCH_APPLIED_JOBS_FAILURE:
      return { ...initialState, fetchAppliedJobsError: true };
    default:
      return state;
  }
};
