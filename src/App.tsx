import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks';

import Navigation from './components/Navigation';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Navigation>
          <Routes />
        </Navigation>
      </AppProvider>
    </Router>
  );
};

export default App;
