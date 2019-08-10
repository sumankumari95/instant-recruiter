import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Routes from './client/Routes';
import authenticationReducer from './redux/reducers/authentication';
import jobPostReducer from './redux/reducers/postJobRequirements';
import fetchJobsReducer from './redux/reducers/fetchJobPosts';
import applyJobReducer from './redux/reducers/applyJob';
import fetchAppliedJobs from './redux/reducers/fetchAppliedJobs';
import fetchAppliedUsers from './redux/reducers/fetchAppliedUsers';

import './client/index.css';

const history = createHashHistory();
// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: history, authenticationReducer, jobPostReducer, fetchJobsReducer, applyJobReducer, fetchAppliedJobs, fetchAppliedUsers,
});
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk, routerMiddleware(history))));


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
