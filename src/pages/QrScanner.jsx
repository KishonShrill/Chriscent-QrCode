import axios from 'axios';
import React, { useRef, useState, forwardRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import EntityProfile from '../api/Entities';
import '../styles/QRCodeScanner.css';

const QrScanner = forwardRef((props, ref) => {
  const [data, setData] = useState('No result');
  const [scanning, setScanning] = useState(false);
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  const ENTITITY_API_URL = 'http://localhost:5000/api/entities'; // Update the URL if needed
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
  const scanQRCode = () => {setScanning(!scanning);}

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(ENTITITY_API_URL);
        const fetchedEntities = response.data;
        setEntities(fetchedEntities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntity();
  });

  const desiredEntity = entities.find(entity => entity.id === data);

  const renderScanner = () => {
    return (
      <>
        <div className='scanner__container'>
          <h1 className='scan-title'>Qr Code Scanner</h1>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {setData(result?.text);}
              if (!!error) {console.info(error);}
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
    return (
      <>
        <img className="result__img" src="{desiredEntity.image}" alt="" />
        <div className='result__container'>
          <fieldset>
            <legend><span>Name:</span></legend>
            {desiredEntity ? (<p>{desiredEntity.name}</p>) : (<p>No Result...</p>)}
          </fieldset>
          <fieldset>
            <legend><span>Bio:</span></legend>
            {desiredEntity ? (<p>{desiredEntity.bio}</p>) : (<p>No Result...</p>)}
          </fieldset>
          <fieldset>
            <legend><span>Likes:</span></legend>
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
            <legend><span>Dislikes:</span></legend>
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
          <fieldset>
            <legend><span>Image Path:</span></legend>
            {desiredEntity ? (<p>{desiredEntity.image}</p>) : (<p>No Result...</p>)}
          </fieldset>
        </div>
      </>
    );
  }

  return !scanning ? renderScanner() : renderResult();
});

export default QrScanner;