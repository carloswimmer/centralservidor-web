import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
};

export default App;
