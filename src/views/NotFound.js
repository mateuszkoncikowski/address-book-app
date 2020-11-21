import React from 'react';
import { Link, useNavigate } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import NavBar from '../components/NavBar';
import { PATHS } from '../config';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(12),
  },
}));

function NotFound() {
  const navigate = useNavigate();
  const classes = useStyles();

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
      <Typography
        variant="h4"
        component="h3"
        align="center"
        className={classes.title}
      >
        Ups, go back to <Link to={PATHS.home}>Home</Link>
      </Typography>
    </>
  );
}

export default NotFound;
