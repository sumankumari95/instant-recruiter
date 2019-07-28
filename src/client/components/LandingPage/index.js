import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkForAuth } from '../../../redux/actions/authentication';
import copy from './copy';
import './styles.css';
import '../../assets/images/logo.jpg';

const mapStateToProps = state => state.authenticationReducer;

const mapDispatchToProps = dispatch => ({
  checkForAuthentication: ({ email, password }) => {
    dispatch(checkForAuth({ email, password }));
  },
});

const LoginBox = (props) => {
  const {
    authenticated, history, usernameError, invalidPassword, checkForAuthentication,
  } = props;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (authenticated) {
      history.push('/home');
    }
  }, [authenticated]);

  const submitForm = (e) => {
    e.preventDefault();
    checkForAuthentication({ email, password });
  };

  const getError = () => {
    if (usernameError) return 'Invalid Email address';
    if (invalidPassword) return 'Invalid Password';
    return null;
  };

  return (
    <React.Fragment>
      <h1 className="irp-page_header">{copy.heading}</h1>
      <div className="loginBox">
        <div className="irp-loginbox_contents">
          <img src="/logo.jpg" width="90px" height="90px" alt="logo" />
          <p>{copy.introductory_text}</p>
          <div style={{ marginTop: '10px' }}>&copy;Suman Kumari</div>
          <div>
            <form onSubmit={submitForm}>
              <label htmlFor="email">
                {copy.email_header}
                <br />
                <p className="error">{getError()}</p>
                <input
                  className="irp-login_field"
                  type="text"
                  name="name"
                  onChange={e => setEmail(e.target.value)}
                  placeholder={copy.loginFields_placeholder.email}
                  required
                />
                <input
                  className="irp-login_field"
                  type="password"
                  name="name"
                  onChange={e => setPassword(e.target.value)}
                  placeholder={copy.loginFields_placeholder.password}
                  required
                />
              </label>
              <input type="submit" value="Continue" />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

LoginBox.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  usernameError: PropTypes.bool,
  invalidPassword: PropTypes.bool,
  checkForAuthentication: PropTypes.func.isRequired,
};

LoginBox.defaultProps = {
  usernameError: false,
  invalidPassword: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
