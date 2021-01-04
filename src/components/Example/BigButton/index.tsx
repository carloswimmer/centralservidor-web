import React from 'react';
import { Button } from '@material-ui/core';
import { PrintRounded } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

import useStyles from './styles';

const BigButton: React.FC = ({ children }) => {
  const { palette } = useTheme();
  const customColor = palette.error;
  const classes = useStyles({ customColor });

  return (
    <Button
      startIcon={<PrintRounded />}
      size="large"
      variant="contained"
      className={classes.root}
    >
      {children}
    </Button>
  );
};

export default BigButton;
