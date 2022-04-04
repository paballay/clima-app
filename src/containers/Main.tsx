import React from 'react';
import { Router } from 'router/Router';
import { Header } from 'containers/Header/Header';
import './Main.scss';

export const Main = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};
