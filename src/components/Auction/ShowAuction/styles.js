import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    flexGrow: 1,
  },
  container: {
    paddingTop: '2em',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  bidForm: {
    '& > *': {
      marginTop: '10px',
    },
  },
}));
