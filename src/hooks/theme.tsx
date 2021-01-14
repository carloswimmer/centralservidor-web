import React, { useMemo } from 'react';

import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import { useDarkMode } from './darkMode';

export const ThemeProvider: React.FC = ({ children }) => {
  const { darkMode } = useDarkMode();

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          light: '#418F89',
          main: '#00615C',
          dark: '#003633',
          contrastText: '#F1F8E9',
        },
        secondary: {
          light: '#6ABF69',
          main: '#388E3C',
          dark: '#00600F',
          contrastText: '#FAFAFA',
        },
        warning: {
          main: '#FF6D00',
        },
        error: {
          main: '#D50000',
          contrastText: '#FAFAFA',
        },
        text: {
          primary: darkMode ? '#6fce52' : '#37474f',
        },
      },
      typography: {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
      },
    });
  }, [darkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MuiThemeProvider>
  );
};
