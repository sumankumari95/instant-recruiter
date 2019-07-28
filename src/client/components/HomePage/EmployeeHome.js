import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../../redux/actions/fetchJobPosts';
import { applyForJob } from '../../../redux/actions/applyJob';
import { fetchAppliedJobs } from '../../../redux/actions/fetchAppliedJobs';

const mapStateToProps = state => ({
  jobPosts: state.fetchJobsReducer.jobPosts,
  userData: state.authenticationReducer.userData,
  jobApplication: state.applyJobReducer,
  appliedJobs: state.fetchAppliedJobs.appliedJobs,
});

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => {
    dispatch(fetchJobs());
  },
  applyForJob: ({ jobId, userId }) => {
    dispatch(applyForJob({ jobId, userId }));
  },
  fetchAppliedJob: (userId) => {
    dispatch(fetchAppliedJobs(userId));
  },
});

const EmployeeHome = (props) => {
  useEffect(() => {
    props.fetchJobs();
    props.fetchAppliedJob(props.userData.Id);
  }, []);

  const isApplyDisabled = (post) => {
    const isBandMatch = props.userData.Band === post.Band;
    const userSkills = props.userData.Skills.split(',');
    const jobSkills = post.Skills.split(',');
    let counter = 0;
    jobSkills.forEach((skill) => {
      if (userSkills.includes(skill)) {
        counter += 1;
      }
    });
    const skillsMatch = (counter / jobSkills.length) * 100 > 80;
    if (!isBandMatch || !skillsMatch) {
      return true;
    }
    return false;
  };

  const isAlreadyApplied = post => props.appliedJobs.includes(post.JobId);

  const handleApplyAction = (jobId) => {
    const userId = props.userData.Id;
    props.applyForJob({ jobId, userId });
  };

  return (
    <React.Fragment>
      {props.jobPosts.length
        && props.jobPosts.map(post => (
          <div key={post.JobId} className="employeee-job-posts">
            <p>
              <strong>Job reference id: </strong>
              {post.JobId}
            </p>
            <p>
              <strong>Manager Name: </strong>
              {post.ManagerName}
            </p>
            <p>
              <strong>Manager Email: </strong>
              {post.ManagerEmail}
            </p>
            <p>
              <strong>Manager Contact: </strong>
              {post.ManagerPhone}
            </p>
            <p>
              <strong>Job Location: </strong>
              {post.Location}
            </p>
            <p>
              <strong>Job Description: </strong>
              {post.JobDesc}
            </p>
            <p>
              <strong>Required Skillsets: </strong>
              {post.Skills}
            </p>
            <p>
              <strong>Expected Band: </strong>
              {post.Band}
            </p>
            <button
              type="button"
              disabled={isApplyDisabled(post) || isAlreadyApplied(post)}
              className="apply"
              onClick={() => handleApplyAction(post.JobId)}
            >
              Apply
            </button>
            {isApplyDisabled(post) && (
              <p className="error">
                Apply disabled. Your profile did not match the requirements
              </p>
            )}
            {props.jobApplication.jobApplySuccesful
              && props.jobApplication.jobsApplied.includes(post.JobId) && (
                <p style={{ color: 'green', marginTop: '2em' }}>
                  You have been successfully applied for this position. You can
                  tract the progress in Employee dashboard
                </p>
            )}
            {props.appliedJobs.includes(post.JobId) && (
            <p className="error">
                  You have already applied for this position. You can
                  tract the progress in Employee dashboard
            </p>
            )}
          </div>
        ))}
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeHome);
