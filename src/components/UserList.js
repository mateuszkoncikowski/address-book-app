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

  return (
    <div className={classes.container}>
      <Snackbar open={isLastItemDisplayed} autoHideDuration={6000}>
        <Alert severity="info">End of users catalog</Alert>
      </Snackbar>
      <UserInfoDialog
        handleClose={() => setSelectedUser(null)}
        isOpen={!!selectedUser}
        user={selectedUser}
      />
      <InfiniteList
        setIsLastItemDisplayed={setIsLastItemDisplayed}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default UserList;
