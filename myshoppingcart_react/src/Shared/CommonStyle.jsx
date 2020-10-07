import { makeStyles } from "@material-ui/core";

export const listStyles = () => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
      color: "white",
      background: "#3f51b5",
    },
    " & .MuiTableSortLabel-root:hover": {
      color: "white",
    },
  },
  paper: {
    margin: "16px",
    marginLeft: "45px",
    padding: "16px",
  },
  searchtxtbox: {
    paddingLeft: "0px",
    paddingBottom: "15px",
  },
});

export const categoryFormstyles = () => ({
  root: {
    "& .MuiGrid-grid-xs-10": {
      margin: "26px",
    },
  },
  smMargin: {
    margin: "8px",
  },
});

export const productFormstyles = () => ({
  root: {
    "& .MuiGrid-grid-xs-10": {
      marginTop: "18px",
      marginLeft: "20px",
    },
    "& .MuiTextField-root": {
      margin: "8px",
    },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      textAlign: "left",
    },
  },
  formControl: {
    margin: "8px",
    width: "100%",
  },
  smMargin: {
    margin: "8px",
  },
});
