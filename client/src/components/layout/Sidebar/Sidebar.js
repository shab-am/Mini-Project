import React, { useState } from 'react';
import './Sidebar.scss';
import { Fragment } from 'react';
import saricon from '../../../images/sar.png';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [sidebarVisible, setsidebarVisible] = useState(true);
  const location = useLocation();

  return (
    <Fragment>
      <div className={sidebarVisible ? 'sidebar' : 'sidebar expand'}>
        <div className='sidebar-brand'>
          <img src={saricon} alt='' />
          <p>Search And Rescue</p>
          <i
            onClick={() => {
              setsidebarVisible(!sidebarVisible);
            }}
            className={
              sidebarVisible ? 'fas fa-bars fa-lg' : 'fas fa-times fa-lg'
            }
          ></i>
        </div>
        <div className='sidebar-menu'>
          <div className='section'>
            <p className='section-header'>Main</p>
            <ul>
              <Link to='/home'>
                <li
                  className={
                    location.pathname === '/home' ? 'active-tab' : ''
                  }
                >
                  <i className='fas fa-home fa-lg'></i>
                  <p>Home</p>
                </li>
              </Link>
              <Link to='/report'>
                <li
                  className={
                    location.pathname === '/report' ? 'active-tab' : ''
                  }
                >
                  <i className='fas fa-fighter-jet fa-lg'></i>
                  <p>Report</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Search And Rescue</p>
            <ul>
              <Link to='/search-area'>
                <li
                  name='search-area'
                  className={
                    location.pathname === '/search-area'
                      ? 'active-tab'
                      : ''
                  }
                >
                  <i
                    name='search-area'
                    className='fas fa-search-location fa-lg'
                  ></i>
                  <p name='search-area'>Search Area</p>
                </li>
              </Link>
              <Link to='/search-pattern'>
                <li
                  name='search-pattern'
                  className={
                    location.pathname === '/search-pattern'
                      ? 'active-tab'
                      : ''
                  }
                >
                  <i
                    name='search-pattern'
                    className='fas fa-quidditch fa-lg'
                  ></i>
                  <p name='search-pattern'>Sweep Pattern</p>
                </li>
              </Link>
              <Link to='/results'>
                <li
                  name='results'
                  className={
                    location.pathname === '/results' ? 'active-tab' : ''
                  }
                >
                  <i name='results' className='fas fa-poll fa-lg'></i>
                  <p name='results'>Results</p>
                </li>
              </Link>
            </ul>
          </div>
          <div className='section'>
            <p className='section-header'>Extras</p>
            <ul>
              <Link to='/rescue-teams'>
                <li
                  name='Rescue Teams'
                  className={
                    location.pathname === '/rescue-teams'
                      ? 'active-tab'
                      : ''
                  }
                >
                  <i
                    name='rescue-teams'
                    className='fas fa-helicopter fa-lg'
                  ></i>
                  <p name='rescue-teams'>Rescue Teams</p>
                </li>
              </Link>
              <Link to='/alert'>
                <li
                  name='alert'
                  className={
                    location.pathname === '/alert' ? 'active-tab' : ''
                  }
                >
                  <i
                    name='alert'
                    className='fas fa-exclamation-triangle fa-lg'
                  ></i>
                  <p name='alert'>Alert</p>
                </li>
              </Link>
              <Link to='/about'>
                <li
                  name='about'
                  className={
                    location.pathname === '/about' ? 'active-tab' : ''
                  }
                >
                  <i name='about' className='fas fa-users fa-lg'></i>
                  <p name='about'>About us</p>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
