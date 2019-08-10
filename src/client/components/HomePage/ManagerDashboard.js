/* eslint-disable no-plusplus */
/* eslint-disable func-names */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteJobs, fetchJobs } from '../../../redux/actions/fetchJobPosts';
import { fetchAppliedUsers } from '../../../redux/actions/fetchAppliedUsers';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  deleteTheJob: (jobId) => {
    dispatch(deleteJobs(jobId));
  },
  fetchJobs: () => {
    dispatch(fetchJobs());
  },
  fetchAllAppliedUsers: (userId, jobId) => {
    dispatch(fetchAppliedUsers(userId, jobId));
  },
});

const FetchAppliedUserDetails = (props) => {
  const { users, jobId } = props;
  const activePosts = users.filter(u => u.jobId === jobId)[0];


  if (!users.length || !activePosts || !activePosts.applicants.length) {
    return <p>No applicants so far</p>;
  }
  return (
    <div className="applicants-wrapper">
      {
        <div className="applicants-flex-item">
          {
 activePosts.applicants.map((a, i) => (
   // eslint-disable-next-line react/no-array-index-key
   <div key={i} className="applicants-inline-view">
     <p>{`Name:        ${a.Name}`}</p>
     <p>{`Age:         ${a.Age}`}</p>
     <p>{`Band:        ${a.Band}`}</p>
     <p>{`Gender:      ${a.Sex}`}</p>
     <p>{`Skills:      ${a.Skills.split(',').join(', ')}`}</p>
     <p>{`Phone:       ${a.Phone}`}</p>
     <p>{`Email:       ${a.Email}`}</p>
     <p>{`Location:    ${a.Location}`}</p>
     <p>{`Experience:  ${a.Experience}`}</p>
   </div>
 ))
      }
        </div>
  }
    </div>
  );
};

const ManagerDashboard = (props) => {
  const managerPosts = props.fetchJobsReducer.jobPosts.filter(post => post.ManagerId === props.authenticationReducer.userData.Id);

  function handleAccordion() {
    const acc = document.getElementsByClassName('applicant-accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }

  useEffect(() => {
    handleAccordion();
    props.fetchJobs();
    managerPosts.forEach((post) => {
      if (post.Applicants) {
        post.Applicants.split(',').forEach((applicant) => {
          props.fetchAllAppliedUsers(applicant, post.JobId);
        });
      }
    });
  }, [props.fetchJobsReducer.jobPosts.length]);

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
        {managerPosts.length
          ? managerPosts.map(post => (
            <div key={post.JobId} className="employeee-job-posts">
              <p>
                <strong>Job reference id: </strong>
                {post.JobId}
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
              <button type="button" className="applicant-accordion">View applicant details</button>
              <div className="panel">
                <FetchAppliedUserDetails users={props.fetchAppliedUsers.appliedUsers} jobId={post.JobId} />
              </div>
              <button type="button" className="delete-job_button" onClick={() => props.deleteTheJob(post.JobId)}>Delete</button>
            </div>
          )) : <div> You don&apos;t have any active job posts</div>}
      </div>
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard);
