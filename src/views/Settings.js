import React from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';
import LanguageSelector from '../components/LanguageSelector';

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
      <LanguageSelector />
    </>
  );
}

export default Settings;
