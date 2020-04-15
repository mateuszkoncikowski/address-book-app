import React from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddressList from '../components/AddressList';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar
        withSearch
        icon={
          <IconButton onClick={() => navigate(PATHS.settings)} color="inherit">
            <AccountCircle />
          </IconButton>
        }
      />
      <AddressList />
    </>
  );
}

export default Home;
