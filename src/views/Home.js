import React, { Suspense, useState } from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NavBar from '../components/NavBar';
import UserSearch from '../components/UserSearch';
import { PATHS } from '../config';
import Loading from '../components/Loading';

const UserList = React.lazy(() => {
  return import('../components/UserList');
});

function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <NavBar
        searchComponent={
          <UserSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        }
        navigationIcon={
          <IconButton
            onClick={() => navigate(PATHS.settings)}
            color="inherit"
            data-cy="settings-link"
          >
            <AccountCircle />
          </IconButton>
        }
      />
      <Suspense fallback={<Loading />}>
        <UserList searchValue={searchValue} />
      </Suspense>
    </>
  );
}

export default Home;
