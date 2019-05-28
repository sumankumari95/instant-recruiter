import React from 'react';
import { connect } from 'react-redux';

import LoginBox from './LoginBox';
import copy from './copy';
import './styles.css';

const LandingPage = () => (
  <>
    <h1 className="irp-page_header">{copy.heading}</h1>
    <LoginBox />
  </>
);

export default connect()(LandingPage);
