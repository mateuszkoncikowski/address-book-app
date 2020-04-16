import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import UserInfoDialog from './UserInfoDialog';
import UserListItem from './UserListItem';
import useAddresses from '../hooks/useAddresses';
import useFilter, { filterUser } from '../hooks/useFilter';
import Loading from './Loading';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));

function AddressList(props) {
  const classes = useStyles();
  const { batchSize, fetchLimit, lang, searchValue } = props;
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, fetchMore, hasMore, error, status] = useAddresses(
    lang,
    fetchLimit,
    batchSize
  );
  const [filteredUsers] = useFilter(users, searchValue, filterUser);

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
          loader={status === 'loading' && <Loading />}
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
      {status !== 'loading' && filteredUsers.length === 0 && (
        <Box textAlign="center" color="primary">
          No results available
        </Box>
      )}
    </>
  );
}

AddressList.propTypes = {
  batchSize: PropTypes.number.isRequired,
  fetchLimit: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const settings = state.settings;
  return {
    lang: settings.lang,
    batchSize: settings.batchSize,
    fetchLimit: settings.fetchLimit,
  };
};

export default connect(mapStateToProps, null)(AddressList);
