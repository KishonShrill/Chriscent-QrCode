import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/cameraAppAnimation.json';

// import QRCodeGenerator from '../components/QRCodeGenerator.jsx';
// import QRCodeScanner from '../components/QRCodeScanner.jsx';

import '../App.css';

export default function App() {  
  return (
    <div className='app__container'>
      <CameraSVGAnimation />
      <i className='app__onomatopoeia'>* snap, click, shutter *</i>
      <h1 className='app__title'>Ready, set... Smile</h1>
      <div className='app__btnContainer'>
        <a className='btn' href="/qr-generator">QR Generator</a>
        <a className='btn' href="/qr-scanner">QR Scanner</a>
      </div>
    </div>
  );
};

    {/* <QRCodeScanner /> */}


function CameraSVGAnimation() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    }
  };
    
  useEffect(() => {
    const container = document.getElementById('lottie-container');

    function handleResize() {
      container.style.width = `${window.innerWidth}px`;
      container.style.height = `${window.innerHeight}px`;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id='lottie-container'>
      <Lottie 
        className="lottie"
	      options={defaultOptions}
        width={280}
      />
    </div>
  );
}