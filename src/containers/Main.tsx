import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ByCity } from './ByCity/ByCity';
import { Header } from './Header/Header';
import { ByLocation } from './ByLocation/ByLocation';
import { ByDay } from './ByDay/ByDay';

export const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ByLocation />} />
        <Route path="/city" element={<ByCity />} />
        <Route path="/day" element={<ByDay />} />
      </Routes>
    </>
  );
};
