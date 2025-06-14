import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(3),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: "antiquewhite",
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "antiquewhite",
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          color="primary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
