import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-body": {
      margin: theme.spacing(1),
      //   color: "#FFFFFF",
    },
    "& .MuiTableCell-head": {
      //   color: "#FFFFFF",
      fontSize: "16px",
    },
    width: "100%",
    backgroundColor: "inherit",
    textAlign: "left",
  },

  table: {
    color: "#FFFFFF",
  },
  detailsIcon: {
    width: "22%",
    height: "auto",
  },
}));
