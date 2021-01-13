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
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { VisibilityOff, Visibility, Copyright } from '@material-ui/icons';

import logoCentral from '../../assets/centralservidor-logo-texto.png';
import logoCentralDark from '../../assets/centralservidor-logo-texto-dark.png';
import logoSshd from '../../assets/SshdLogo.png';
import logoPms from '../../assets/LogoPMS.png';
import signInBackground from '../../assets/people-working.jpg';

import SignInForm from './SingInForm';
import { useDarkMode } from '../../hooks/darkMode';

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    backgroundColor:
      palette.type === 'light' ? palette.primary.light : undefined,
    color: palette.primary.contrastText,
  },

  contentClass: {
    height: '100vh',
    maxWidth: 600,
  },

  header: {
    flex: 1,
    height: 279,
    backgroundColor:
      palette.type === 'dark' ? palette.primary.dark : palette.primary.main,
    '& img': {
      width: 370,
    },
  },

  formHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 14,
    marginTop: 40,
    '& img': {
      width: 48,
      marginRight: 6,
    },
  },
  formHeaderText: {
    maxWidth: 270,
    marginBottom: 36,
  },

  backgroundClass: {
    position: 'relative',
    flex: 1,
    background: `url(${signInBackground}) no-repeat center`,
    backgroundSize: 'cover',

    '&:after': {
      position: 'absolute',
      content: '""',
      height: '100vh',
      width: '100%',
      top: 0,
      left: 0,
      background:
        'linear-gradient(to right, rgba(4, 44, 30, 0.6) 20%, rgba(53, 6, 124, 0.6) 100%)',
    },
  },

  logoPms: {
    position: 'absolute',
    top: 56,
    right: 64,

    '& img': {
      width: 176,
    },
  },

  copyright: {
    display: 'flex',
    position: 'absolute',
    bottom: 40,
    right: 64,
    opacity: 0.6,
  },
}));

interface State {
  password: string;
  showPassword: boolean;
}

const SignIn: React.FC = () => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });
  const classes = useStyles();
  const { darkMode } = useDarkMode();

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
          <img
            src={darkMode ? logoCentralDark : logoCentral}
            alt="Logo Central do Servidor"
          />
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
          <Box maxWidth={340}>
            <Grid item>
              <SignInForm />
            </Grid>
          </Box>
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
