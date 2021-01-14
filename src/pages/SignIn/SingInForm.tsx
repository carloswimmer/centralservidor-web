import React, { useCallback, useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useDarkMode } from '../../hooks/darkMode';

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: 4,
      marginBottom: 24,
    },
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(230, 241, 225, 0.8)',
      transition: 'background-color 0.3s',
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: 'rgba(230, 241, 225, 0.65)',
    },
  },
  formButton: {
    marginTop: 8,
    marginBottom: 56,

    '& button': {
      height: 48,
    },
  },
}));

interface SignInProps {
  password: string;
  showPassword: boolean;
}

const initialValues = {
  password: '',
  showPassword: false,
};

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();
  const { darkMode } = useDarkMode();

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((state) => !state);
  }, []);

  const handleMouseDownPassword = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="sshd"
        label="SSHD"
        variant={darkMode ? 'outlined' : 'filled'}
        color="secondary"
        fullWidth
      />
      <TextField
        id="password"
        label="Senha"
        variant={darkMode ? 'outlined' : 'filled'}
        color="secondary"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                style={darkMode ? { color: '#ffffffb0' } : {}}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={showPassword}
        fullWidth
      />
      <Box className={classes.formButton}>
        <Button variant="contained" size="large" color="secondary" fullWidth>
          Entrar
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;
