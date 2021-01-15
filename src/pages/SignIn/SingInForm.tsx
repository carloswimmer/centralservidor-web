import React, { useCallback, useState, MouseEvent } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useDarkMode } from '../../hooks/darkMode';
import handleFieldProps from '../../utils/handleFieldProps';
import { Input, Button } from '../../components/controls';

const useStyles = makeStyles(({ zIndex }: Theme) => ({
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
  backdrop: {
    zIndex: zIndex.drawer + 1,
    color: '#fff',
  },
}));

interface SignInProps {
  sshd: string;
  password: string;
  showPassword: boolean;
}

const initialValues: SignInProps = {
  sshd: '',
  password: '',
  showPassword: false,
};

const signInSchema = Yup.object({
  sshd: Yup.string()
    .required('Campo obrigatório')
    .min(8, ({ min }) => `Mínimo de ${min} caracteres`),
  password: Yup.string().required('Campo obrigatório'),
});

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();
  const { darkMode } = useDarkMode();

  const handleSignInSubmit = useCallback(
    (signInValues: SignInProps, actions: FormikHelpers<SignInProps>) => {
      setTimeout(() => {
        console.log('submitted! ', signInValues);
        actions.setSubmitting(false);
        actions.resetForm();
      }, 3000);
    },
    [],
  );

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
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values, actions) => handleSignInSubmit(values, actions)}
    >
      {(formik) => (
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Input
            label="SSHD"
            id="sshd"
            variant={darkMode ? 'outlined' : 'filled'}
            {...handleFieldProps(formik, 'sshd')}
          />
          <Input
            label="Senha"
            id="password"
            variant={darkMode ? 'outlined' : 'filled'}
            type={showPassword ? 'text' : 'password'}
            {...handleFieldProps(formik, 'password')}
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
          />
          <Box className={classes.formButton}>
            {formik.isSubmitting && (
              <Backdrop className={classes.backdrop} open>
                <CircularProgress color="secondary" />
              </Backdrop>
            )}
            <Button
              type="submit"
              size="large"
              fullWidth
              color="secondary"
              text="Entrar"
              disabled={formik.isSubmitting}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignInForm;
