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
        const response = await axios.get(ENTITITY_API_URL);
        const fetchedEntities = response.data;
        setEntities(fetchedEntities);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntity();
  }, []); // Provide an empty dependency array to fetch entities once

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
    const day = 1;
    const month = 11;

    // const currentDate = new Date();
    // const day = currentDate.getDate();
    // const month = currentDate.getMonth() + 1;

    console.log("Day is: " + day);
    console.log("Month is:  " + month);

    const isBirthday = desiredEntity?.birthday?.month === month && desiredEntity?.birthday?.day === day;

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
        {isBirthday && (
          <section>
            <div className='birthday-wrapper'>
              <h1 className='birthday__title'>Happy Birthday LoveCake</h1>
              <div className='birthday__picture-wrapper'><img className='birthday__picture' src="/images/20231028_175457.jpg" alt="" /></div>
              <p>hi there!! i'm LoveCake ^o^</p>
              <p>💖 11 / 01 / 01 💖</p>
              <p>I tend to hop around when talking about a particular subject that interests me 😁 especially if it's about (GoSe) 👀</p>
              <br />
              <p>✨ I like a looooot of things &#62;.&#60; ⭐</p>
              <p>watching horror movies 🍿🎥</p>
              <p>reading books 📚🤓</p>
              <p>eating chips 🍴🤤</p>
              <p>french fries 🍟🤤</p>
              <p>rabbits 🐇</p>
              <p>rich 🤑💵</p>
              <p>spring season ☂️⛱️ </p>
              <p>swimming 🏊‍♂️🥽</p>
              <br />
              <p>😒 If there are things I dislike, it'be 😤</p>
              <p>noisy while im sleeping 😴😫</p>
              <p>cussing 🤬</p>
              <p>gossip mongers 🗨️</p>
              <p>pathological liars 🗣️</p>
              <p>bad people 🙊🙅‍♂️</p>
              <p>no signal 📶🚫</p>
              <p>🤷‍♂️ penis shaped keychain 🤷‍♂️</p>
              <p>overpriced goods 🤑💹</p>
              <p>people who violate animals 🐈🔫</p>
              <p>people who points stuff at you 🙉🙈🙊</p>
              <br />
              <h1 className='birthday__footer'>More Birthday's to come</h1>
            </div>
          </section>
        )}
      </>
    );
  }

  return !scanning ? renderScanner() : renderResult();
});

export default QrScanner;