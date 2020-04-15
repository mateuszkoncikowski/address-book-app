import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import App from './App';

ReactDOM.render(
  <>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </>,
  document.getElementById('root')
);
