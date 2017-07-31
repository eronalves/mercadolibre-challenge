import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import path from 'path';
import React from 'react';
import qs from 'qs';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

import apiRoutes from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR)) 

  // API
  .use('/api', apiRoutes)

  // REACT SSR
  .get('/*', (req, res, next) => {
      if (req.url.indexOf('/api') === 0) return next();
      // Compile an initial state
      const preloadedState = { };

      // Create a new Redux store instance
      const store = configureStore(preloadedState);
      const context = {};
      // Render the component to a string
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </Provider>
      );

      // Grab the initial state from our Redux store
      const finalState = store.getState();

      res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Mercado Libre Challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        <script src="${assets.client.js}" defer></script>
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
    </body>
</html>`);
  });

export default server;
