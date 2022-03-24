import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './containers/Main';
import { UserProvider } from './providers/UserProvider';

export const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Main />
      </UserProvider>
    </BrowserRouter>
  );
};
