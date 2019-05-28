import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const Routes = () => (
  <>
    <Route exact path="/" component={LandingPage} />
  </>
);

export default Routes;
