import React, { Suspense } from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';

const LanguageSelector = React.lazy(() => {
  return import('../components/LanguageSelector');
});

function Settings() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar
        navigationIcon={
          <IconButton onClick={() => navigate(PATHS.home)} color="inherit">
            <HomeIcon />
          </IconButton>
        }
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LanguageSelector />
      </Suspense>
    </>
  );
}

export default Settings;
