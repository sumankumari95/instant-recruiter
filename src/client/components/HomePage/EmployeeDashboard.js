import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../../redux/actions/fetchJobPosts';
import { fetchAppliedJobs } from '../../../redux/actions/fetchAppliedJobs';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  fetchJobs: () => {
    dispatch(fetchJobs());
  },
  fetchAppliedJob: (userId) => {
    dispatch(fetchAppliedJobs(userId));
  },
});

const EmployeeDashboard = (props) => {
  useEffect(() => {
    props.fetchJobs();
    props.fetchAppliedJob(props.authenticationReducer.userData.Id);
  }, []);
  const appliedJobs = props.fetchJobsReducer.jobPosts.filter(post => props.fetchAppliedJobs.appliedJobs.includes(post.JobId));

  return (
    <React.Fragment>
      <div style={{ display: 'block' }}>
        <button
          type="button"
          id="logout"
          onClick={() => props.history.push('/')}
        >
          Back to homepage
        </button>
      </div>
      <div className="dashboard_view">
        {appliedJobs.length
          ? appliedJobs.map(post => (
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
            </div>
          )) : <div> You don&apos;t have any active applications</div>}
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
