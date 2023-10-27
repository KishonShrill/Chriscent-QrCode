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

  const goBackHome = () => {
    return window.location.href='/home'
  }
  
  return (
    <div className='qr-code__contianer' ref={qrCodeRef}>
      <div className='qr-code'>
        <QRCode 
          bgColor='#4378e9'
          fgColor='white'
          size={170} 
          value={text}
         />
      </div>
      <div className='qr-code__btns'>
        <button className='btn btn-genet' onClick={goBackHome}>Go Back</button>
        <button className="btn btn-genet" onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
}