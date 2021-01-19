import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TransitionProps } from '@material-ui/core/transitions';

import { ToastMessage } from '../hooks/toast';

interface ToastProps {
  messages: ToastMessage[];
}

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const Toast: React.FC<ToastProps> = ({ messages }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);

  const handleOpen = useCallback(() => {
    if (messages.length) {
      setMessage(messages[0]);
      setOpen(true);
    }
  }, [messages]);

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  const handleClose = useCallback((event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  const handleExited = useCallback(() => {
    messages.splice(0, 1);

    handleOpen();
  }, [messages, handleOpen]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
      onExited={handleExited}
    >
      <Alert
        severity={message.severity || 'error'}
        variant="filled"
        elevation={6}
        onClose={handleClose}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
