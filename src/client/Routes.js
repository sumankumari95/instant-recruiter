import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import EmployeeDashboard from './components/HomePage/EmployeeDashboard';
import ManagerDashboard from './components/HomePage/ManagerDashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/employeeDashboard" component={EmployeeDashboard} />
    <Route exact path="/managerDashboard" component={ManagerDashboard} />
  </Switch>
);

export default Routes;
