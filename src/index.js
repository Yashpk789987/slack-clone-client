// import React from 'react';
// import ReactDOM from 'react-dom';
// import Routes from './routes';
// import baseurl from './baseurl';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';
// import * as serviceWorker from './serviceWorker';
// import 'semantic-ui-css/semantic.min.css';
// const client = new ApolloClient({
//   uri: baseurl
// });

// const App = (
//   <ApolloProvider client={client}>
//     <Routes />
//   </ApolloProvider>
// );

// ReactDOM.render(App, document.getElementById('root'));

// serviceWorker.unregister();

import baseurl from './baseurl';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const networkInterface = createNetworkInterface({
  uri: baseurl
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      req.options.headers['x-token'] = localStorage.getItem('token');
      req.options.headers['x-refresh-token'] = localStorage.getItem(
        'refreshToken'
      );
      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware({ response: { headers } }, next) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
serviceWorker.unregister();
