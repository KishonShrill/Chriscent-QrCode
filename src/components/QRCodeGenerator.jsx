import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import '../styles/QRCodeGenerator.css';

export default function QRCodeGenerator({ text }) {
  const qrCodeRef = useRef(null);

  const handleSaveClick = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');

    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      a.click();
    }
  };
  
  return (
    <div className='qr-code__contianer' ref={qrCodeRef}>
      <QRCode size={200} value={text} />
      <button className="btn" onClick={handleSaveClick}>Save</button>
    </div>
  );
}