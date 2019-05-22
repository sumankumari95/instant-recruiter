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

  return `
  <html>
    <head>
        <meta charset="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta charset="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initialScale=1, shrink-to-fit=yes">
        <link href="main.css" rel="stylesheet"s>
        <title>Instant Recruiter</title>
    </head>
    <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
    </body>
  </html>
  `;
};
