import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './styles/theme';
import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SignIn />
      </ThemeProvider>
    </>
  );
};

export default App;
