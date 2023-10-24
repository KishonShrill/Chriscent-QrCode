import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import QrScanner from './pages/QrScanner.jsx';
import QrGenerator from './pages/QrGenerator.jsx';

import './App.css';

export default function App() {  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route index path='/Home' element={<Home />} />
          <Route index path='/qr-scanner' element={<QrScanner />} />
          <Route index path='/qr-generator' element={<QrGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};