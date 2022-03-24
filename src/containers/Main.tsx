import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ByCity } from './ByCity/ByCity';
import { Header } from './Header/Header';
import { MyLocation } from './MyLocation/MyLocation';

export const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MyLocation />} />
        <Route path="/city" element={<ByCity />} />
      </Routes>
    </>
  );
};
