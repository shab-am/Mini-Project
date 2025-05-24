import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { hideDialog } from './../../../actions/dialog';

const DialogAlert = () => {
  const dispatch = useDispatch();
  const { title, description, buttontext, visible } = useSelector((state) => ({
    title: state.dialogReducer.title,
    description: state.dialogReducer.description,
    buttontext: state.dialogReducer.buttontext,
    visible: state.dialogReducer.visible,
  }));

  return (
    <Dialog
      open={visible}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => dispatch(hideDialog())}
        >
          {buttontext}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
