import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert, AlertProps } from '@material-ui/lab';
import { TransitionProps } from '@material-ui/core/transitions';

interface ToastProps extends AlertProps {
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
}

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const Toast: React.FC<ToastProps> = (props) => {
  const [open, setOpen] = useState<boolean>(true);
  const { message, severity, ...others } = props;

  const handleClose = useCallback((event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
    >
      <Alert
        severity="error"
        variant="filled"
        elevation={6}
        onClose={handleClose}
        {...others}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
