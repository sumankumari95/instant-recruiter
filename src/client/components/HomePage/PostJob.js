/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import copy from '../LandingPage/copy';

const PostJob = (props) => {
  const { userData, jobDetails } = props;

  const [jobDesc, setJobDesc] = useState('');
  const [location, setLocation] = useState('');
  const [band, setBand] = useState('');
  const [noOfApp, setNoOfApp] = useState(1);
  const [skills, setSkills] = useState([]);
  const [formError, setFormError] = useState(false);

  const skillField = React.createRef();

  const handleSkills = () => {
    const skillToSave = skillField.current.value;
    if (!skills.includes(skillToSave)) {
      setSkills(skills.concat([skillToSave]));
    }
  };

  const removeListItem = (e, item) => {
    const indexToRemove = skills.indexOf(item);
    const newArr = [...skills];
    newArr.splice(indexToRemove, 1);
    setSkills(newArr);
  };

  const submitJobReq = (e) => {
    e.preventDefault();
    if (!jobDesc || !location || !noOfApp || !skills.length || !band) {
      setFormError(true);
    } else {
      props.postJobAction({
        jobDesc,
        location,
        band,
        noOfApp,
        skills,
        managerId: userData.Id,
        managerName: userData.Name,
        managerEmail: userData.Email,
        managerPhone: userData.Phone,
      });
    }
  };

  return (
    <div>
      <div style={{ marginTop: '3em', marginLeft: '3em' }}>
        <form onSubmit={submitJobReq}>
          <p>Enter the project description:</p>
          <textarea onChange={e => setJobDesc(e.target.value)}>
            {jobDesc}
          </textarea>
          <br />
          <div style={{ marginTop: '1em' }}>
            <label htmlFor="location">
              Location:
              <input
                style={{ marginLeft: '1em' }}
                className="jobpost-input"
                type="text"
                name="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div style={{ marginTop: '1em' }}>
            <label htmlFor="band">
              Band:
              <select
                name="band"
                style={{ marginLeft: '1em' }}
                className="jobpost-input"
                onChange={e => setBand(e.target.value)}
              >
                <option disabled selected value>
                  Please seletc
                </option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="B3">B3</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
                <option value="C3">C3</option>
                <option value="D3">D1</option>
              </select>
            </label>
          </div>
          <br />
          <div style={{ marginTop: '1em' }}>
            <label htmlFor="maxApplicants">
              Maximum number of applicants:
              <input
                style={{ marginLeft: '1em' }}
                className="jobpost-input"
                type="number"
                value={noOfApp}
                name="maxApplicants"
                min="1"
                max="100"
                onChange={e => setNoOfApp(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div style={{ marginTop: '1em' }}>
            <label htmlFor="skills">
              Skills expected for this project:
              <input
                className="jobpost-input"
                list="skillsSet"
                style={{ marginLeft: '1em' }}
                name="skillsSet"
                ref={skillField}
              />
              <datalist id="skillsSet">
                {copy.skills.map(s => (
                  <option key={s} value={s} />
                ))}
              </datalist>
              <input
                id="saveButton"
                type="button"
                value="save"
                style={{ padding: '5px' }}
                onClick={handleSkills}
              />
            </label>
            {formError && (
              <p className="error">Please fill all the required fields.</p>
            )}
            <div className="skillSetList">
              {skills.map(s => (
                <button
                  className="skillListButton"
                  onClick={e => removeListItem(e, s)}
                  type="button"
                  key={s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <input
            style={{ padding: '5px', borderRadius: '2em', marginTop: '2em' }}
            type="submit"
            value="Post the requirement"
          />
        </form>
        {jobDetails.jobPostSucessful && (
          <p
            style={{ color: 'green', marginTop: '4em' }}
          >
            {`Requirement has been posted successfully. Go to Manager dashboard for further details. Job ID ${
              jobDetails.jobId
            }`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostJob;
