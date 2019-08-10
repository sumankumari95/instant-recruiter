import React from 'react';
import copy from '../LandingPage/copy';
import './styles.css';

const ProfilePane = (props) => {
  const {
    Title, Name, Age, Role, Band, Sex, Phone, Email, Location, Experience, Skills,
  } = props;

  return (
    <div className="profileSection">
      <p className="greeting">{`Welcome ${Title} ${Name}`}</p>
      {
        Role === 'Manager' && (
          <p className="greeting profile-contents">{copy.instruction.manager}</p>
        )
      }
      {
        Role === 'Employee' && (
          <p className="greeting profile-contents">{copy.instruction.employee}</p>
        )
      }
      <div className="profile-contents">
        <h4>Profile summary</h4>
        <p>{`Name:        ${Name}`}</p>
        <p>{`Age:         ${Age}`}</p>
        <p>{`Role:        ${Role}`}</p>
        <p>{`Band:        ${Band}`}</p>
        <p>{`Gender:      ${Sex}`}</p>
        {
          Role === 'Employee' && (
            <p>{`Skills:      ${Skills.split(',').join(', ')}`}</p>
          )
        }
        <p>{`Phone:       ${Phone}`}</p>
        <p>{`Email:       ${Email}`}</p>
        <p>{`Location:    ${Location}`}</p>
        <p>{`Experience:  ${Experience}`}</p>
      </div>
    </div>
  );
};

export default ProfilePane;
