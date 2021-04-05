import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  container: {
    paddingTop: "2em",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bidForm: {
    "& > *": {
      margin: theme.spacing(1),
      //   width: "25ch",
      //   marginTop: "5ch",
    },
  },
}));
