import React, { useRef, useState, forwardRef } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = forwardRef((props, ref) => {
  const [data, setData] = useState('No result');

  const initialFacing = localStorage.getItem('facing') || 'environment';
  const [facing, setFacing] = useState(initialFacing); // 'user' or 'environment'
  const videoRef = ref || useRef(null);

  const handleSwitchCamera = () => {
    // Toggle the 'facing' state.
    const newFacing = facing === 'environment' ? 'user' : 'environment';
    setFacing(newFacing);

    // Save the updated 'facing' value to local storage.
    localStorage.setItem('facing', newFacing);

    // Refresh the browser to apply the new camera facing mode.
    window.location.reload();
  };  

  return (
    <>
      {facing === 'environment' ? (
        <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
        ref={videoRef}
        constraints={{
          facingMode: 'environment'
        }}
      />
      ) : (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: '100%' }}
          ref={videoRef}
          constraints={{
            facingMode: 'user'
          }}
        />
      )}

      {/* TODO: Connect to mongoDB to display data from qr code */}
      <p className='qrReader__data'>{data}</p>
      <button className='qrReader__camSwitch' onClick={handleSwitchCamera}>Switch Camera</button>
    </>
  );
});

export default QRCodeScanner;