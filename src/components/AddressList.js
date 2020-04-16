import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import UserInfoDialog from './UserInfoDialog';
import UserListItem from './UserListItem';
import useAddresses from '../hooks/useAddresses';
import useFilter from '../hooks/useFilter';
import Loading from './Loading';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
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

function AddressList(props) {
  const classes = useStyles();
  const { searchValue, lang } = props;
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
          loader={!error && <Loading />}
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
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  lang: state.settings.lang,
});

export default connect(mapStateToProps, null)(AddressList);
