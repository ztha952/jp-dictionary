import React from 'react';
import Data from './mock.json';
import { useState, useRef  } from 'react';
import logo from './assets/syougatsu_hatsuhinode_2022.png'
import './index.css';

export default function App() {
  const [query, setQuery] = useState('');
  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
    setQuery('')

  };
  return (
    <div className='main'>
    <div className='fg'>
    <img className='logo' src={logo} alt='2022' />
    </div>
    
    <h2>Japan-Myanmar Dictionary</h2>
   
    <div className='wrap'>
      <input className='search'
        placeholder="Enter Kana or Myanmar" ref={ref}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button onClick={reset} class="searchButton">
        <img className='btn' src="https://img.icons8.com/ios/50/000000/delete-sign--v1.png" alt='icon'/>
     </button>
      </div>
      {Data.filter((post) => {
        if (query === '') {
          return;
        } else if (post.romaji.includes(query)) {
          return post;
        } else if (post.kana.includes(query)) {
          return post;
        } else if (post.meaning_mm.includes(query)) {
          return post;
        } 
      }).map((post, index) => (
        <div className="box" key={index}>
          <h2>{post.kanji}</h2>
          <p>{post.kana}</p>
          <p>{post.meaning_mm}</p>
        </div>
      ))}
    </div>
  );
}