import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

const Example: React.FC = () => {
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
          <Button variant="contained" color="primary">
            Lets Start
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Example;
