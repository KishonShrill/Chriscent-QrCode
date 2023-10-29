import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import '../styles/QRCodeGenerator.css';

export default function QRCodeGenerator({ text }) {
  const qrCodeRef = useRef(null);

  const handleSaveClick = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');

    if (canvas) {
      // Create a new canvas with a 10px margin
      const newCanvas = document.createElement('canvas');
      const newContext = newCanvas.getContext('2d');
      newCanvas.width = canvas.width + 40; // 10px margin on each side
      newCanvas.height = canvas.height + 40; // 10px margin on each side

      // Fill the new canvas with a white background
      newContext.fillStyle = '#4378e9';
      newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

      // Draw the original QR code on the new canvas with a 10px margin
      newContext.drawImage(canvas, 10, 10);

      const url = newCanvas.toDataURL('image/png');
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
          fgColor='black'
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