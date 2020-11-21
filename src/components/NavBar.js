import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { PATHS } from '../config';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
  homeLink: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'lightGrey',
    },
  },
}));

function NavBar({ searchComponent, navigationIcon }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" noWrap>
          <Link className={classes.homeLink} to={PATHS.home}>
            Address Book
          </Link>
        </Typography>
        {searchComponent && searchComponent}
        <div className={classes.grow} />
        {navigationIcon && navigationIcon}
      </Toolbar>
    </AppBar>
  );
}

NavBar.defaultProps = {
  searchComponent: null,
  navigationIcon: null,
};

NavBar.propTypes = {
  searchComponent: PropTypes.node,
  navigationIcon: PropTypes.node,
};

export default NavBar;
