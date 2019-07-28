import axios from 'axios';

export const types = {
  JOB_POST_STARTED: 'JOB_POST_STARTED',
  JOB_POST_SUCCESSFUL: 'JOB_POST_SUCCESSFUL',
  JOB_POST_ERROR: 'JOB_POST_ERROR',
};

const jobPostStarted = () => ({
  type: types.JOB_POST_STARTED,
});

const jobPostError = () => ({
  type: types.JOB_POST_ERROR,
});

const jobPostSuccessful = jobId => ({
  type: types.JOB_POST_SUCCESSFUL,
  payload: jobId,
});

export const postTheJob = ({
  jobDesc, location, band, noOfApp, skills, managerId, managerName, managerEmail, managerPhone,
}) => (dispatch) => {
  dispatch(jobPostStarted());
  axios.post('http://localhost:4040/postJobDetails', {
    jobDesc, location, band, noOfApp, skills, managerId, managerName, managerEmail, managerPhone,
  }).then((res) => {
    if (res.data) { dispatch(jobPostSuccessful(res.data)); }
  }).catch(() => {
    dispatch(jobPostError());
  });
};
