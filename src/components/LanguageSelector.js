import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { COUNTRY_CODES } from '../config';
import { switchLanguage } from '../actions';

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

function LanguageSelector(props) {
  const { lang, switchLanguage } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.header}>
        Change language
      </Typography>
      <ToggleButtonGroup
        variant="contained"
        color="primary"
        aria-label="outlined primary button group"
        value={lang}
      >
        {COUNTRY_CODES.map(({ code }) => (
          <ToggleButton
            key={code}
            value={code}
            onClick={() => switchLanguage(code)}
            data-cy={`set-lang-${code}`}
          >
            {code}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

LanguageSelector.propTypes = {
  lang: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lang: state.settings.lang,
});

const mapDispatchToProps = (dispatch) => ({
  switchLanguage: (lang) => dispatch(switchLanguage(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
