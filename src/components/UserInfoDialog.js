import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Dialog from './Dialog';
import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';

const renderSection = (title, fields) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {`${title}:`}
      </Typography>
      {fields.map((field, index) => {
        return (
          <Typography key={index} variant="body1" gutterBottom>
            {field}
          </Typography>
        );
      })}
    </>
  );
};

function UserInfoDialog({ isOpen, handleClose, user }) {
  if (user === null) return null;

  const {
    name: { first, last },
    location: {
      street: { name, number },
      city,
      state,
      postcode,
    },
    phone,
    cell,
  } = user;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle onClose={handleClose}>
        User Info - {`${first} ${last}`}
      </DialogTitle>
      <DialogContent dividers>
        {renderSection('Address', [`${name} ${number}`, city, state, postcode])}
        {renderSection('Contact', [phone, cell])}
      </DialogContent>
    </Dialog>
  );
}

UserInfoDialog.defaultProps = {
  user: null,
};

UserInfoDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    cell: PropTypes.string.isRequired,
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postcode: PropTypes.number.isRequired,
      street: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
      }),
    }),
  }),
};

export default UserInfoDialog;
