import React from 'react';

import { DarkModeProvider } from './darkMode';
import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </DarkModeProvider>
  );
};

export default AppProvider;
