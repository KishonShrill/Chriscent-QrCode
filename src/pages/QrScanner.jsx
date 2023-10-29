import axios from 'axios';
import React, { useRef, useState, forwardRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
// import LazyImage from '../components/Lazy-Loading';
import '../styles/QRCodeScanner.css';

function isValidURL(string) {
  // Regular expression for a simple URL pattern (http or https)
  const urlPattern = /^(https?:\/\/\S+)/;
  return urlPattern.test(string);
}

const QrScanner = forwardRef((props, ref) => {
  // Use States for the functions
  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(false);
  const [entities, setEntities] = useState([]);
  
  // Variables needed to for string completion
  const ENTITITY_API_URL = 'https://chriscent-qr-api.vercel.app/api/entities';
  const initialFacing = localStorage.getItem('facing') || 'environment';
  const [facing, setFacing] = useState(initialFacing); // 'user' or 'environment'
  const videoRef = ref || useRef(null);

  const handleSwitchCamera = () => {
    const newFacing = facing === 'environment' ? 'user' : 'environment';
    setFacing(newFacing);
    localStorage.setItem('facing', newFacing);
    window.location.reload();
  };

  const goBackHome = () => {return window.location.href='/home'}
  const goBackScan = () => {return window.location.reload()}
  const scanQRCode = () => {
    if (isValidURL(data)) {
      window.location.href = data;
    } else {
      setScanning(!scanning);
    }
  }

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(ENTITITY_API_URL || 'http://localhost:5000/api/entities');
        const fetchedEntities = response.data;
        setEntities(fetchedEntities);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntity();
  });

  const renderScanner = () => {
    return (
      <>
        <div className='scanner__container'>
          <h1 className='scan-title'>Qr Code Scanner</h1>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {setData(result?.text);}
              if (!!error) {console.info('Error scanning QR code:', error);}
            }}
            style={{ width: '100%' }}
            ref={videoRef}
            constraints={{
              facingMode: facing,
            }}
          />
    
          <p className='qrReader__data'>{data}</p>
          <div className='qr-scanner__btns'>
            <button className='btn' onClick={goBackHome}>Go Back</button>
            <button className='btn' onClick={handleSwitchCamera}>Switch</button>
            <button className='btn btn-scan' onClick={scanQRCode}>Scan</button>
          </div>
        </div>
      </>
    );
  }

  const renderResult = () => {
    const desiredEntity = entities.find(entity => entity.id === data);
    return (
      <>
        <div className='result__container'>
          <img className="result__img" src={desiredEntity.image} alt="Profile"  />
          <button className='btn btn-result' onClick={goBackScan}>Back</button>
          <fieldset className='fieldset-top'>
            <legend><span>Name &#127881;:</span></legend>
            {desiredEntity ? (<p>{desiredEntity.name}</p>) : (<p>No Result...</p>)}
          </fieldset>
          <fieldset>
            <legend><span>Bio &#128221;:</span></legend>
            {desiredEntity ? (<p>{desiredEntity.bio}</p>) : (<p>No Result...</p>)}
          </fieldset>
          <div className='result__likesDislikes'>
            <fieldset>
              <legend><span>Likes &#128077;:</span></legend>
              {desiredEntity ? (
                <ul>
                  {desiredEntity.likes.map((like, index) => (
                    <li key={index}>{like}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>No Result...</li>
                </ul>
              )}
            </fieldset>
            <fieldset>
              <legend><span>Dislikes &#128683;:</span></legend>
              {desiredEntity ? (
                <ul>
                  {desiredEntity.dislikes.map((dislike, index) => (
                    <li key={index}>{dislike}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                  <li>No Result...</li>
                </ul>
              )}
            </fieldset>
          </div>
        </div>
      </>
    );
  }

  return !scanning ? renderScanner() : renderResult();
});

export default QrScanner;