import React from 'react';
import AppProvider from './hooks';

import SignIn from './pages/SignIn';
import Toast from './components/Toast';

const App: React.FC = () => {
  return (
    <AppProvider>
      <SignIn />
      <Toast message="Ops, aconteceu algum problema..." />
    </AppProvider>
  );
};

export default App;
