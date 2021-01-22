import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import AppShell from './components/appShell';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppShell>
          <Routes />
        </AppShell>
      </AppProvider>
    </Router>
  );
};

export default App;
