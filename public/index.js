/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRootContainer = require('./App').default;

    ReactDOM.render(<NextRootContainer />, document.getElementById('root'));
  });
}
