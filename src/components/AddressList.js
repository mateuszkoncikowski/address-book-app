import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import UserInfoDialog from './UserInfoDialog';
import UserListItem from './UserListItem';
import useAddresses from '../hooks/useAddresses';
import { useSessionStorage } from 'react-use';
import useFilter from '../hooks/useFilter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
  },
}));

const filterUsers = (filter, user) => {
  const {
    name: { first, last },
  } = user;
  const loweredFilter = filter.toLowerCase();

  return (
    first.toLowerCase().includes(loweredFilter) ||
    last.toLowerCase().includes(loweredFilter)
  );
};

function AddressList({ searchValue }) {
  const classes = useStyles();

  const [lang] = useSessionStorage('lang');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, fetchMore, hasMore, error, status] = useAddresses(lang);
  const [filteredUsers] = useFilter(users, searchValue, filterUsers);

  return (
    <>
      <UserInfoDialog
        handleClose={() => setSelectedUser(null)}
        isOpen={!!selectedUser}
        user={selectedUser}
      />
      <List className={classes.root}>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            !error && (
              <div className={classes.loaderContainer}>
                <CircularProgress />
              </div>
            )
          }
          endMessage={
            <Box textAlign="center" color="primary">
              End of users catalog
            </Box>
          }
        >
          {filteredUsers.map((user, index) => {
            return (
              <UserListItem
                index={index}
                onClick={() => setSelectedUser(user)}
                user={user}
                key={index}
              />
            );
          })}
        </InfiniteScroll>
      </List>
      {status === 'error' && (
        <Box textAlign="center" color="red">
          {error.message}
        </Box>
      )}
    </>
  );
}

AddressList.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default AddressList;
