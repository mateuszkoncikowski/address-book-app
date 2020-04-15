import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { map, pipe, reduce } from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

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

const getUsers = async (key, page = 1) => {
  console.log('key', key);

  const { data } = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=25&seed=sherpany`
  );

  return { users: data.results, page: data.info.page };
};

function AddressList() {
  const classes = useStyles();

  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState([]);

  const { status, data, error, fetchMore } = useInfiniteQuery(
    'getUsers',
    getUsers,
    {
      getFetchMore: (lastGroup) => lastGroup.page + 1,
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      const users = pipe(
        map((group) => group.users),
        reduce((acc, cur) => [...acc, ...cur], [])
      )(data);

      setUsers(users);
    }
  }, [data]);

  useEffect(() => {
    if (users.length >= 100) {
      setHasMore(false);
    }
  }, [users]);

  return (
    <>
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
            <p style={{ textAlign: 'center' }}>
              <b>End of users catalog</b>
            </p>
          }
        >
          {users.map((user, index) => {
            const {
              picture: { thumbnail },
              name: { first, last },
              email,
              login: { username },
            } = user;

            return (
              <ListItem key={user.login.uuid}>
                <ListItemAvatar>
                  <Avatar src={thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${index + 1}. ${username} - ${first} ${last}`}
                  secondary={email}
                />
              </ListItem>
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

export default AddressList;
