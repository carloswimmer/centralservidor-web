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
          light: darkMode ? '##62efff' : '#418F89',
          main: darkMode ? '#00bcd4' : '#00615C',
          dark: darkMode ? '#008ba3' : '#003633',
          contrastText: '#F1F8E9',
        },
        secondary: {
          light: darkMode ? '#ff6fa7' : '#6ABF69',
          main: darkMode ? '#f73378' : '#388E3C',
          dark: darkMode ? '#be004d' : '#00600F',
          contrastText: darkMode ? '#37474f' : '#FAFAFA',
        },
        warning: {
          main: '#FF6D00',
        },
        error: {
          main: '#D50000',
          contrastText: '#FAFAFA',
        },
        text: {
          primary: darkMode ? '#00bcd4' : '#37474f',
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
