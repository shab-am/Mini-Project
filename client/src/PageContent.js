import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Report from './components/Pages/Report/Report';
import Alert from './components/Pages/Alert/Alert';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';
import RescueTeams from './components/Pages/RescueTeams/RescueTeams';
import Results from './components/Pages/Results/Results';
import About from './components/Pages/About/About';
import DialogAlert from './components/layout/DialogAlert/DialogAlert';

const PageContent = () => {
  return (
    <section className='main'>
      <DialogAlert />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/report" element={<Report />} />
        <Route path="/results" element={<Results />} />
        <Route path="/search-area" element={<SearchArea />} />
        <Route path="/search-pattern" element={<SearchPattern />} />
        <Route path="/rescue-teams" element={<RescueTeams />} />
      </Routes>
    </section>
  );
};

export default PageContent;
