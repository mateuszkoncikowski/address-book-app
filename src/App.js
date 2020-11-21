import React from 'react';
import { Router } from '@reach/router';
import Home from './views/Home';
import Settings from './views/Settings';
import { PATHS } from './config';
import NotFound from './views/NotFound';

function App() {
  return (
    <Router>
      <NotFound default />
      <Home path={PATHS.home} />
      <Settings path={PATHS.settings} />
    </Router>
  );
}

export default App;
