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
    // const day = 1;
    // const month = 11;

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;

    console.log("Day is: " + day);
    console.log("Month is:  " + month);

    /* functions for album preview */
    const openImage1 = () => {document.getElementById('image-preview1').style.display = 'flex';}
    const openImage2 = () => {document.getElementById('image-preview2').style.display = 'flex';}
    const openImage3 = () => {document.getElementById('image-preview3').style.display = 'flex';}
    const openImage4 = () => {document.getElementById('image-preview4').style.display = 'flex';}
    const openImage5 = () => {document.getElementById('image-preview5').style.display = 'flex';}
    const openImage6 = () => {document.getElementById('image-preview6').style.display = 'flex';}
    const openImage7 = () => {document.getElementById('image-preview7').style.display = 'flex';}

    const closeImage1 = () => {document.getElementById('image-preview1').style.display = 'none';}
    const closeImage2 = () => {document.getElementById('image-preview2').style.display = 'none';}
    const closeImage3 = () => {document.getElementById('image-preview3').style.display = 'none';}
    const closeImage4 = () => {document.getElementById('image-preview4').style.display = 'none';}
    const closeImage5 = () => {document.getElementById('image-preview5').style.display = 'none';}
    const closeImage6 = () => {document.getElementById('image-preview6').style.display = 'none';}
    const closeImage7 = () => {document.getElementById('image-preview7').style.display = 'none';}

    /* boolean it the date matches with the participant */
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

              <img className='gif' src="/images/drum.gif" alt="" />
              <div className='birthday__picture-wrapper'><img className='birthday__picture' src="/images/20231028_175457.jpg" alt="" /></div>
              <p>hi there!! i'm LoveCake ^o^</p>
              <p>💖 11 / 01 / 01 💖</p>
              <p>I tend to hop around when talking about a particular subject that interests me 😁 especially if it's about (GoSe) 👀</p>
              
              <img className='gif' src="/images/gif1.gif" alt="" />
              <p>✨ I like a looooot of things &#62;.&#60; ⭐</p>
              <p>watching horror movies 🍿🎥</p>
              <p>reading books 📚🤓</p>
              <p>eating chips 🍴🤤</p>
              <p>french fries 🍟🤤</p>
              <p>rabbits 🐇</p>
              <p>rich 🤑💵</p>
              <p>spring season ☂️⛱️ </p>
              <p>swimming 🏊‍♂️🥽</p>
              
              <img className='gif' src="/images/gif2.gif" alt="" />
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
              <p>🙉🙈🙊</p>
              
              <img className='gif' src="/images/cute.gif" alt="" />
              <h2>Smol Album of Moments</h2>
              <div className='smol-album'>
                <img className='thumbnail' onClick={openImage1} src="/images/20231028_172640.jpg" alt="" />
                <div className='thumbnail album-text-wrapper'>
                  <p className='album-text'>
                  Click the Images!
                  Click the Images!
                  Click the Images!  
                  Click the Images!
                  Click the Images!
                  Click the Images!
                  Click the Images!
                  </p>
                </div>
                <img className='thumbnail' onClick={openImage2} src="/images/received_948441902918724.jpeg" alt="image" />
                <img className='thumbnail' onClick={openImage3} src="/images/received_1469426317126146.jpeg" alt="image" />
                <img className='thumbnail' onClick={openImage4} src="/images/20231028_134910.jpg" alt="image" />
                <img className='thumbnail' onClick={openImage5} src="/images/20231028_133407.jpg" alt="image" />
                <img className='thumbnail' onClick={openImage6} src="/images/20231028_133308.jpg" alt="image" />
                <img className='thumbnail' onClick={openImage7} src="/images/received_236624259367279.jpeg" alt="image" />
              </div>

              <img className='gif' src="/images/banner.gif" alt="" />
              <h2>🎼 poem 🎶</h2>
              <p className='poem'>
                <br />
                glare a gaze upon a star, <br />
                songs of melody and twinkling fate; <br />
                listen to the songs of the wind <br />
                that sings tunes about your grace. <br />
                <br />
                feel the drip of falling rain drops, <br />
                they bear the good message of peace; <br />
                listen to the sound of ripples, <br />
                they hold the key to understanding. <br />
                <br />
                breathe in the waft of sweet perfume, <br />
                unlocking memories of nostalgic feelings; <br />
                hold it in and embrace the moment, <br />
                the past is not of chains but of enlightenment <br />
                <br />
                now close your eyes and visualize, <br />
                touch key that holds your memory; <br />
                let the tears flow like rivers of a creek, <br />
                as you recall all the bad and good times. <br />
                <br />
                slowly open your eyes and face the morn, <br />
                let the glaze of sun rays touch your skin; <br />
                breathe out, breathe in, <br />
                let another journey of your life, begin. <br />
                <br />
              </p>

              <img className='gif' src="/images/gif3.gif" alt="" />
              <h2>Birthday Wish</h2>
              <p className='wish'>
                I wish for all fate to realign when you
                walk down the road towards your journey. <br />
                I wish for the stars to guide you as you
                walk down the road of challenges. <br />
                I forever wish that everytime you wake up
                that you will never forget who you are,
                a person ever so kind and compassionate,
                so loving and true. <br />
                I wish that when you are ready, when the time comes and I'll be waiting for you.
                <p className='author'>- website author</p>
              </p>
              <br /><br />
              <p>~~ more birthday wishes incoming ~~</p>
              <br />
              <img className='gif' src="/images/cute3.gif" alt="" />
              <h1 className='birthday__footer'>More Birthday's to come</h1>
            </div>

            {/* Image Preview Section */}
            <div id='image-preview1' className='image-preview'>
              <img className='pop-preview' onClick={closeImage1} src="/images/20231028_172640.jpg" alt="" />
            </div>
            <div id='image-preview2' className='image-preview'>
              <img className='pop-preview' onClick={closeImage2} src="/images/received_948441902918724.jpeg" alt="" />
            </div>
            <div id='image-preview3' className='image-preview'>
              <img className='pop-preview' onClick={closeImage3} src="/images/received_1469426317126146.jpeg" alt="" />
            </div>
            <div id='image-preview4' className='image-preview'>
              <img className='pop-preview' onClick={closeImage4} src="/images/20231028_134910.jpg" alt="" />
            </div>
            <div id='image-preview5' className='image-preview'>
              <img className='pop-preview' onClick={closeImage5} src="/images/20231028_133407.jpg" alt="" />
            </div>
            <div id='image-preview6' className='image-preview'>
              <img className='pop-preview' onClick={closeImage6} src="/images/20231028_133308.jpg" alt="" />
            </div>
            <div id='image-preview7' className='image-preview'>
              <img className='pop-preview' onClick={closeImage7} src="/images/received_236624259367279.jpeg" alt="" />
            </div>
          </section>
        )}
      </>
    );
  }

  return !scanning ? renderScanner() : renderResult();
});

export default QrScanner;
