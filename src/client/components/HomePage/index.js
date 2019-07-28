import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../../../redux/actions/authentication';
import { postTheJob } from '../../../redux/actions/postJobRequirement';
import ProfilePane from './ProfilePane';
import PostJob from './PostJob';
import EmployeeHome from './EmployeeHome';
import './styles.css';

const mapStateToProps = state => ({
  userData: state.authenticationReducer.userData,
  jobDetails: state.jobPostReducer,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutAction());
  },
  postTheJob: ({
    jobDesc,
    location,
    band,
    noOfApp,
    skills,
    managerId,
    managerName,
    managerEmail,
    managerPhone,
  }) => {
    dispatch(
      postTheJob({
        jobDesc,
        location,
        band,
        noOfApp,
        skills,
        managerId,
        managerName,
        managerEmail,
        managerPhone,
      }),
    );
  },
});

const HomePage = (props) => {
  const logout = () => {
    props.logout();
    props.history.push('/');
  };

  return (
    <div className="homePage_container">
      <div className="logout-button_wrapper">
        <button type="button" id="logout" onClick={logout}>
          Logout
        </button>
        {
          props.userData.Role === 'Manager' && (
          <button type="button" id="managerDashboard">
          Manager dashboard
          </button>
          )
        }
        {
          props.userData.Role === 'Employee' && (
          <button type="button" id="employeeDashboard">
          Employee dashboard
          </button>
          )
        }
      </div>
      <div className="container">
        <div className="infoPane">
          {props.userData.Id && <ProfilePane {...props.userData} />}
        </div>
        <div className="actionPane">
          {props.userData.Role === 'Manager' && (
            <PostJob postJobAction={props.postTheJob} {...props} />
          )}
          {
            props.userData.Role === 'Employee' && (
              <EmployeeHome {...props} />
            )
          }
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
