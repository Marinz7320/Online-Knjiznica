import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: "10px",
  },
  error: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

function ConfirmationModal(props) {
  const {
    open,
    onClose,
    onConfirm,
    errorMessage,
    okButtonText,
    cancelButtonText,
  } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h5" className={classes.error}>
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleConfirm}
          >
            {okButtonText}
          </Button>
          {cancelButtonText && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleClose}
            >
              {cancelButtonText}
            </Button>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  okButtonText: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  cancelButtonText: null,
};

export default ConfirmationModal;
