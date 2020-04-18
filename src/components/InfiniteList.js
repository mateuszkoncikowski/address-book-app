import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import UserListItem from './UserListItem';
import useFilter, { filterUser } from '../hooks/useFilter';
import useUsers from '../hooks/useUsers';
import { COUNTRY_CODES } from '../config';

function InfiniteList(props) {
  const {
    batchSize,
    fetchLimit,
    lang,
    searchValue,
    setIsLastItemDisplayed,
    setIsLoading,
    setSelectedUser,
  } = props;

  const [users, fetchMore, isLoading] = useUsers(lang, fetchLimit, batchSize);
  const filteredUsers = useFilter(users, searchValue, filterUser);

  const isItemLoaded = (index) => {
    return !!users[index];
  };

  const loadMoreItems = (startIndex, stopIndex) => {
    fetchMore({ startIndex, stopIndex });
  };

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={fetchLimit}
        loadMoreItems={loadMoreItems}
        threshold={batchSize}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filteredUsers.length}
                itemSize={60}
                onItemsRendered={(event) => {
                  setIsLastItemDisplayed(
                    event.visibleStopIndex === fetchLimit - 1
                  );
                  return onItemsRendered(event);
                }}
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
    </>
  );
}

InfiniteList.propTypes = {
  fetchLimit: PropTypes.number.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  setIsLastItemDisplayed: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  batchSize: PropTypes.number.isRequired,
  lang: PropTypes.oneOf(COUNTRY_CODES.map((c) => c.code)).isRequired,
};

const mapStateToProps = (state) => {
  const { settings, search } = state;
  return {
    searchValue: search.searchValue,
    fetchLimit: settings.fetchLimit,
    lang: settings.lang,
    batchSize: settings.batchSize,
  };
};

export default connect(mapStateToProps, null)(InfiniteList);
