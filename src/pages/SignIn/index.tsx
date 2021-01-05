import React, { useState, MouseEvent } from 'react';
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  AccountCircle,
  VisibilityOff,
  Visibility,
  LockRounded,
  Copyright,
} from '@material-ui/icons';

import logoCentral from '../../assets/centralservidor-logo-texto.png';
import logoSshd from '../../assets/SshdLogo.png';
import logoPms from '../../assets/LogoPMS.png';
import useStyles from './styles';

interface State {
  password: string;
  showPassword: boolean;
}

const SignIn: React.FC = () => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });
  const { palette } = useTheme();
  const backgroundGridColor = palette.primary;
  const classes = useStyles({ backgroundGridColor });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.contentClass} container item>
        <Grid
          className={classes.header}
          container
          item
          justify="center"
          alignItems="center"
        >
          <img src={logoCentral} alt="Logo Central do Servidor" />
        </Grid>
        <Grid container item direction="column" alignItems="center">
          <Grid className={classes.formHeader} item>
            <img src={logoSshd} alt="Logo Autenticação SSHD" />
            <Box fontSize={28} fontWeight="fontWeightBold">
              SSHD
            </Box>
          </Grid>
          <Grid className={classes.formHeaderText} item>
            <Typography variant="body1" align="center">
              Entre com sua conta da prefeitura para ter acesso ao sistema
            </Typography>
          </Grid>
          <Grid item>
            <form className={classes.formContent} noValidate autoComplete="off">
              <TextField id="sshd" label="SSHD" variant="filled" />
              <TextField
                id="password"
                label="Senha"
                variant="filled"
                type={values.showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={values.showPassword}
              />
            </form>
          </Grid>
          <Grid className={classes.formButton} item>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
            >
              Entrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.backgroundClass} item />
      <Grid className={classes.logoPms} item>
        <img src={logoPms} alt="Logo da Prefeitura de Santos" />
      </Grid>
      <Grid className={classes.copyright} item>
        <Copyright fontSize="small" />
        <Typography variant="caption" align="right">
          &nbsp;Composição sobre fotos de Kelly Sikkema, Austin Distel e Glenn
          Carstens-Peters
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignIn;
