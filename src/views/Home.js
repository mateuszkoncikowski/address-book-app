import React, { Suspense, useState } from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NavBar from '../components/NavBar';
import AddressSearch from '../components/AddressSearch';
import { PATHS } from '../config';
import Loading from '../components/Loading';

const AddressList = React.lazy(() => {
  return import('../components/AddressList');
});

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
      <Suspense fallback={<Loading />}>
        <AddressList searchValue={searchValue} />
      </Suspense>
    </>
  );
}

export default Home;
