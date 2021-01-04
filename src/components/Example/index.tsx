import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { DirectionsBikeRounded } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

import BigButton from './BigButton';

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
            startIcon={<DirectionsBikeRounded />}
            style={{ backgroundColor: palette.warning.main }}
            variant="contained"
          >
            Lets Start
          </Button>
        </Grid>
        <Grid item>
          <BigButton>Imprimir</BigButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Example;
