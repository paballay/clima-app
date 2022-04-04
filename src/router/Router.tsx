import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ByLocation } from 'containers/ByLocation/ByLocation';
import { ByCity } from 'containers/ByCity/ByCity';
import { ByDay } from 'containers/ByDay/ByDay';

export const Router = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<ByLocation />} />
        <Route path="/city" element={<ByCity />} />
        <Route path="/day" element={<ByDay />} />
      </Routes>
    </div>
  )
}
