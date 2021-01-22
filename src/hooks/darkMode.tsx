import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface DarkModeContextData {
  darkMode: boolean;
  toggleDarkMode(): void;
}

const DarkModeContext = createContext<DarkModeContextData>(
  {} as DarkModeContextData,
);

const DarkModeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem('@Central:darkMode');

    return mode ? !!mode : false;
  });

  useEffect(() => {
    localStorage.setItem('@Central:darkMode', darkMode.toString());
  }, [darkMode]);

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
