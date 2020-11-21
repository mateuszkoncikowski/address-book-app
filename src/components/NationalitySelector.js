import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { COUNTRY_CODES } from '../config';
import { switchNationality } from '../actions';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(6),
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
}));

function NationalitySelector(props) {
  const { nationality, switchNationality } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.header}>
        Change nationality
      </Typography>
      <ToggleButtonGroup
        variant="contained"
        color="primary"
        value={nationality}
      >
        {COUNTRY_CODES.map(({ code }) => (
          <ToggleButton
            key={code}
            value={code}
            onClick={() => switchNationality(code)}
            data-cy={`set-lang-${code}`}
          >
            {code}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

NationalitySelector.propTypes = {
  nationality: PropTypes.string.isRequired,
  switchNationality: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nationality: state.settings.nationality,
});

const mapDispatchToProps = (dispatch) => ({
  switchNationality: (nationality) => dispatch(switchNationality(nationality)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NationalitySelector);
