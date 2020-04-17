import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserInfoDialog from './UserInfoDialog';
import useUsers from '../hooks/useUsers';
import useFilter, { filterUser } from '../hooks/useFilter';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import UserListItem from './UserListItem';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function UserList(props) {
  const { batchSize, fetchLimit, lang, searchValue } = props;
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, fetchMore, hasNextPage] = useUsers(lang, fetchLimit, batchSize);

  const loadMoreItems = (startIndex, stopIndex) => {
    fetchMore({ startIndex, stopIndex });
  };
  const isItemLoaded = (index) => !!users[index];
  const [filteredUsers] = useFilter(users, searchValue, filterUser);

  return (
    <div
      style={{
        height: window.innerHeight - 80,
      }}
    >
      <Snackbar open={!hasNextPage} autoHideDuration={6000}>
        <Alert severity="info">This is a success message!</Alert>
      </Snackbar>
      <UserInfoDialog
        handleClose={() => setSelectedUser(null)}
        isOpen={!!selectedUser}
        user={selectedUser}
      />
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={fetchLimit}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filteredUsers.length}
                itemSize={60}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
              >
                {({ index, style }) =>
                  isItemLoaded(index) ? (
                    <UserListItem
                      style={style}
                      index={index}
                      onClick={() => setSelectedUser(filteredUsers[index])}
                      user={filteredUsers[index]}
                      key={index}
                    />
                  ) : null
                }
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}

UserList.propTypes = {
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

export default connect(mapStateToProps, null)(UserList);
