import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

function NavBar({ searchComponent, navigationIcon }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Address Book
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
