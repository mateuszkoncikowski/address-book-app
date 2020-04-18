import React, { useState } from 'react';
import UserInfoDialog from './UserInfoDialog';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteList from './InfiniteList';

const useStyles = makeStyles(() => ({
  container: {
    height: window.innerHeight - 80,
  },
}));

function UserList() {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLastItemDisplayed, setIsLastItemDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classes.container}>
      <Snackbar open={isLastItemDisplayed} autoHideDuration={6000}>
        <Alert severity="info">End of users catalog</Alert>
      </Snackbar>
      <Snackbar open={isLoading} autoHideDuration={6000}>
        <Alert severity="info">Loading ...</Alert>
      </Snackbar>
      <UserInfoDialog
        handleClose={() => setSelectedUser(null)}
        isOpen={!!selectedUser}
        user={selectedUser}
      />
      <InfiniteList
        setIsLastItemDisplayed={setIsLastItemDisplayed}
        setSelectedUser={setSelectedUser}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default UserList;
