import axios from 'axios';

export const types = {
  APPLY_JOB_SUCCESSFUL: 'APPLY_JOB_SUCCESSFUL',
  APPLY_JOB_FAILURE: 'APPLY_JOB_FAILURE',
  ALREADY_APPLIED_JOB: 'ALREADY_APPLIED_JOB',
};

const jobApplyFailure = () => ({
  type: types.APPLY_JOB_FAILURE,
});

const alreadyAppliedJob = () => ({
  type: types.ALREADY_APPLIED_JOB,
});

const jobApplySuccessful = jobId => ({
  type: types.APPLY_JOB_SUCCESSFUL,
  payload: jobId,
});

export const applyForJob = ({ jobId, userId }) => (dispatch) => {
  axios.post('http://localhost:4040/applyForJob', {
    jobId, userId,
  }).then((res) => {
    if (res.status === 200) dispatch(jobApplySuccessful(jobId));
    if (res.status === 201) dispatch(alreadyAppliedJob());
  }).catch(() => {
    dispatch(jobApplyFailure());
  });
};
