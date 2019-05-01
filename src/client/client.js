import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../client/Routes';

ReactDOM.hydrate(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>, document.getElementById('root')
);
