import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { COUNTRY_CODES } from '../config';
import { setNationalities } from '../actions';

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

/**
 *
 * Component which manages selected nationalities
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NationalitySelector(props) {
  const { nationalities, setNationalities } = props;
  const classes = useStyles();

  const handleSelectorChange = (event, nationalities) => {
    setNationalities(nationalities);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.header}>
        Set nationalities
      </Typography>
      <ToggleButtonGroup
        variant="contained"
        color="primary"
        value={nationalities}
        onChange={handleSelectorChange}
      >
        {COUNTRY_CODES.map(({ code }) => (
          <ToggleButton key={code} value={code} data-cy={`set-lang-${code}`}>
            {code}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

NationalitySelector.propTypes = {
  nationalities: PropTypes.array.isRequired,
  setNationalities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nationalities: state.settings.nationalities,
});

const mapDispatchToProps = (dispatch) => ({
  setNationalities: (nationalities) =>
    dispatch(setNationalities(nationalities)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NationalitySelector);
