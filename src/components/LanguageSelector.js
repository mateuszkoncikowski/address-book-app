import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSessionStorage } from 'react-use';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { COUNTRY_CODES } from '../config';

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

function LanguageSelector() {
  const classes = useStyles();
  const [lang, setLang] = useSessionStorage('lang');

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
          <ToggleButton key={code} value={code} onClick={() => setLang(code)}>
            {code}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default LanguageSelector;
