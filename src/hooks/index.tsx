import React from 'react';

import { DarkModeProvider } from './darkMode';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </DarkModeProvider>
  );
};

export default AppProvider;
