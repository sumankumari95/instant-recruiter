import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const Routes = () => (
  <>
    <Route exact path="/" component={LandingPage} />
  </>
);

export default Routes;
