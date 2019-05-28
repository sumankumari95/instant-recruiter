import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from '../client/Routes';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        <Routes />
      </StaticRouter>
    </Provider>,
  );

  return `<html>
    <head>
        <link rel="stylesheet" type="text/css" href="Main.css" />
        <title>Instant Recruiter</title>
    </head>
    <body>
        <div id="root">${content}</div>
        <script type="text/js" src="bundle.js"></script>
    </body>
  </html>`;
};
