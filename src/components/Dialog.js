import { default as MuiDialog } from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core';

const Dialog = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialog);

export default Dialog;
