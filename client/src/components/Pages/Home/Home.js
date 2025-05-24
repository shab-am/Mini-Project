import './Home.scss';
import { Link } from 'react-router-dom';
import airsupport from '../../../images/airsupport.png';
import rightArrow from '../../../images/right-arrow.png';
import fillicon from '../../../images/fill-up.png';
import searchicon from '../../../images/searchicon.png';
import patternicon from '../../../images/patternicon.png';
import resultsicon from '../../../images/resultsicon.png';
import one from '../../../images/1.png';
import two from '../../../images/2.png';
import three from '../../../images/3.png';
import four from '../../../images/4.png';

const Home = () => {
  return (
    <main className='homecontent'>
      <img 
        src={airsupport} 
        className='background-image' 
        alt='Air support background' 
        role="presentation"
      />

      <section className='middle'>
        <header className='header'>
          <h2>Perform Search and Rescue Operations for missing aircrafts.</h2>
        </header>
        
        <h3 className='middle-heading'>How It Works?</h3>
        
        <div className='cards' role="list">
          <article className='card' role="listitem">
            <img src={one} className='badge' alt='Step 1' />
            <h4>Report a missing aircraft</h4>
            <p>
              Fill the last known information about aircraft like coordinates,
              altitude, velocity etc.
            </p>
            <img className='main-image' src={fillicon} alt='Fill form illustration' />
          </article>
          
          <img className='arrow' src={rightArrow} alt='' role="presentation" />
          
          <article className='card' role="listitem">
            <img src={two} className='badge' alt='Step 2' />
            <h4>Predict the search area</h4>
            <p>
              Identify the probable search area. Get realtime information of
              area for search and rescue strategy.
            </p>
            <img className='main-image' src={searchicon} alt='Search area illustration' />
          </article>
          
          <img className='arrow' src={rightArrow} alt='' role="presentation" />
          
          <article className='card' role="listitem">
            <img src={three} className='badge' alt='Step 3' />
            <h4>Identify most suitable Search Pattern</h4>
            <p>
              Hit and try available algorithms to sweep the search area to find
              the missing aircraft.
            </p>
            <img className='main-image' src={patternicon} alt='Search pattern illustration' />
          </article>
          
          <img className='arrow' src={rightArrow} alt='' role="presentation" />
          
          <article className='card' role="listitem">
            <img className='badge' src={four} alt='Step 4' />
            <h4>Get Detailed Analysis</h4>
            <p>
              Get the Search and Rescue operation results with detailed analysis
              and information.
            </p>
            <img className='main-image' src={resultsicon} alt='Analysis results illustration' />
          </article>
        </div>

        <footer className='bottom'>
          <Link to="/report" className='button'>
            Click here to report a missing Aircraft
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default Home;
