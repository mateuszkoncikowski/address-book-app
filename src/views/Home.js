import React, { Suspense } from 'react';
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

  return (
    <>
      <NavBar
        searchComponent={<UserSearch />}
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
        <UserList />
      </Suspense>
    </>
  );
}

export default Home;
