import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';

const Routes = () => (
  <>
    <Route exact path="/" component={App} />
  </>
);

export default Routes;
