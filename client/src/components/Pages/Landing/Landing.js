import React from 'react';
import './Landing.scss';
import saricon from '../../../images/sar.png';
import intro from '../../../images/intro.png';
import clock from '../../../images/clock.png';
import airplane1 from '../../../images/airplane1.png';
import airplane2 from '../../../images/airplane2.png';
import startquote from '../../../images/startquote.png';
import endquote from '../../../images/endquote.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <header className="landing-header">
        <nav className="landing-nav">
          <img 
            className='header-logo' 
            src={saricon} 
            alt='SAR Operations Logo' 
          />
          <h1>Search And Rescue Operations For Missing Aircraft</h1>
        </nav>

        <img 
          className='header-image' 
          src={airplane1} 
          alt='Airplane in flight' 
        />
      </header>

      <main className="landing-main">
        <img 
          className='main-left' 
          src={intro} 
          alt='Introduction illustration' 
        />

        <div className='main-right'>
          <blockquote className='quote'>
            <img src={startquote} alt='Opening quote mark' />
            <p>
              The life expectancy of an injured survivor decreases as much as 80
              percent during the first 24 hours, while the chances of survival
              of uninjured survivors rapidly diminishes after the first 3 days
            </p>
            <img src={endquote} alt='Closing quote mark' />
          </blockquote>

          <Link to='/home' className='link'>
            <button className='button'>
              <span>Start Rescue Mission</span>
              <img 
                className='clock' 
                src={clock} 
                alt='Clock icon' 
              />
            </button>
          </Link>
        </div>
      </main>

      <footer className="landing-footer">
        <img 
          className='footer-image' 
          src={airplane2} 
          alt='Airplane illustration' 
        />
      </footer>
    </>
  );
};

export default Landing;
