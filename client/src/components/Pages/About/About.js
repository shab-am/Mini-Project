import './About.scss';
import React from 'react';
import amico from '../../../images/amico.png';
import jecrc from '../../../images/jecrc.png';
import user from '../../../images/user.png';

const About = () => {
  return (
    <section className="about" aria-label="About section">
      <h2>Search And Rescue operations for missing Aircraft</h2>
      <div className="about-inside">
        <div className="team">
          <ul className="your-class">
            <li>
              <img 
                src={user} 
                alt="Team member" 
                loading="lazy"
                width="50"
                height="50"
              />
              <a 
                href="https://github.com/nikhilnagargit/Search-And-Rescue"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </li>
            {/* <li>
              <img src={user} alt="Team member" />
              <span>Laxit Yadav</span>
            </li>
            <li>
              <img src={user} alt="Team member" />
              <span>Lakhan Kachhawa</span>
            </li>
            <li>
              <img src={user} alt="Team member" />
              <span>Karamveer Singh Rathore</span>
            </li> */}
          </ul>
          <img 
            className="jecrc" 
            src={jecrc} 
            alt="JECRC logo" 
            loading="lazy"
            width="100"
            height="100"
          />
        </div>
        <img 
          className="amico" 
          src={amico} 
          alt="Illustration" 
          loading="lazy"
          width="300"
          height="300"
        />
      </div>
    </section>
  );
};

export default About;
