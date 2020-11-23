import React, { Suspense } from 'react';
import { useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';
import Loading from '../components/Loading';

const NationalitySelector = React.lazy(() => {
  return import('../components/NationalitySelector');
});

/**
 *
 * Settings view with nationality selector
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Settings() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar
        navigationIcon={
          <IconButton
            onClick={() => navigate(PATHS.home)}
            color="inherit"
            data-cy="home-link"
          >
            <HomeIcon />
          </IconButton>
        }
      />
      <Suspense fallback={<Loading />}>
        <NationalitySelector />
      </Suspense>
    </>
  );
}

export default Settings;
