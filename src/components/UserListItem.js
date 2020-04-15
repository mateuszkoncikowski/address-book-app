import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[300],
    },
  },
}));

function UserListItem({ user, index, onClick }) {
  const classes = useStyles();

  const {
    picture: { thumbnail },
    name: { first, last },
    email,
    login: { username },
  } = user;

  return (
    <ListItem onClick={onClick} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar src={thumbnail} />
      </ListItemAvatar>
      <ListItemText
        primary={`${index + 1}. ${username} - ${first} ${last}`}
        secondary={email}
      />
    </ListItem>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    picture: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }),
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }),
    login: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserListItem;
