import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Example: React.FC = () => {
  const { palette } = useTheme();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h2">Central do Servidor</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">Central do Servidor</Typography>
        </Grid>
        <Grid item>
          <Button
            style={{ backgroundColor: palette.warning.main }}
            variant="contained"
          >
            Lets Start
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Example;
