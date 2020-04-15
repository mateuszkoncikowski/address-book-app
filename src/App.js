import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import Home from './views/Home';
import Settings from './views/Settings';
import { COUNTRY_CODES, PATHS } from './config';
import { useSessionStorage } from 'react-use';

function App() {
  const [lang, setLang] = useSessionStorage('lang');

  useEffect(() => {
    console.log('initial log', lang);
    if (!lang) {
      setLang(COUNTRY_CODES[2].code);
    }
  }, [lang]);

  return (
    <Router>
      <Home path={PATHS.home} />
      <Settings path={PATHS.settings} />
    </Router>
  );
}

export default App;
