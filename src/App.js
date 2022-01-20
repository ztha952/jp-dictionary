import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect  } from 'react';
import logo from './assets/22309611.jpg'
import './index.css';

export default function App() {

  const [url_, setUrl_] = useState(); 

  useEffect(() => {
    axios
      .get('https://ztha952.github.io/json-test/Data/mock.json')
      .then((res) => {
        setUrl_(res.data);
      }) 
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);


  const [query, setQuery] = useState('');
  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
    setQuery('')

  };
  return (
    <div className='main'>
    <div className='fg'>
    <img className='logos' src={logo} alt='2022' />
    </div>
    
    <h2>Japan-Myanmar Dictionary</h2>
   
    <div className='wrap'>
      <input className='search'
        placeholder="Enter Kana or Myanmar" ref={ref}
         onKeyPress={(e) => {
          if (e.key === 'Enter') {
            setQuery(e.target.value);
          }
        }}
      />
      <button onClick={reset} className="searchButton">
        <img className='btn' src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" alt='icon'/>
     </button>
      </div>
      {url_ &&
        url_
          .filter((post) => {
            const { romaji, kana, kanji, meaning_mm } = post;
            
            if (query === '') {
              return;
            } else if (kanji.includes(query)) {
              return post;
            }else if (romaji.includes(query)) {
              return post;
            }else if (kana.includes(query)) {
              return post;
            } else if (meaning_mm.includes(query)) {
              return post;
            }
          })
          .map((post, index) => {
            const { kana, kanji, meaning_mm } = post;
            return (
              <div className="box" key={index}>
                <h1> {kanji} </h1>
                <p> {kana} </p>
                <h5> {meaning_mm} </h5>
              </div>
            );
          })}
    </div>
  );
}