import React, { createContext, useCallback, useContext, useState } from 'react';

interface DarkModeContextData {
  darkMode: boolean;
  toggleDarkMode(): void;
}

const DarkModeContext = createContext<DarkModeContextData>(
  {} as DarkModeContextData,
);

const DarkModeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((mode) => !mode);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = (): DarkModeContextData => {
  return useContext(DarkModeContext);
};

export { DarkModeProvider, useDarkMode };
