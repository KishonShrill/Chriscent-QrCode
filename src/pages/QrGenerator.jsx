import React, { useState } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator.jsx';

import '../styles/QRCodeGenerator.css';

export default function QrGenerator() {  
  const [qrText, setQRText] = useState('');

  return (
    <>
      <div className='generator__container'>
        <h1>Qr Code Generator</h1>
        <QRCodeGenerator text={qrText} />
        <h2></h2>
        <p></p>
        <input
          className='generator__input'
          type="text"
          placeholder="Enter text for QR code"
          onChange={(e) => setQRText(e.target.value)}
        />
      </div>
    </>
  );
};