import React from 'react';

import { DarkModeProvider } from './darkMode';
import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </DarkModeProvider>
  );
};

export default AppProvider;
