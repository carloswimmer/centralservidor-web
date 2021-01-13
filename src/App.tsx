import React from 'react';
import AppProvider from './hooks';

import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SignIn />
    </AppProvider>
  );
};

export default App;
