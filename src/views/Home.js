import React, { useState } from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddressList from '../components/AddressList';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';
import AddressSearch from '../components/AddressSearch';

function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <NavBar
        searchComponent={
          <AddressSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        }
        navigationIcon={
          <IconButton onClick={() => navigate(PATHS.settings)} color="inherit">
            <AccountCircle />
          </IconButton>
        }
      />
      <AddressList searchValue={searchValue} />
    </>
  );
}

export default Home;
