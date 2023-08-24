import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '../Contexts/ToastContext';

export interface ToastProps {
    message : string
}
export const Toast : React.FC<ToastProps>  = ({ message }) => {
    const { open,  hideToast } = useToast();

  // TODO : remove unused functions
  // const handleClick = () => {
  //     showToast();
  // };

  const handleClose : () => void = () => {
      hideToast();
  };

  const action = (
    <React.Fragment>
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}