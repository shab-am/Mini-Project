import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Report from './components/Pages/Report/Report';
import Home from './components/Pages/Home/Home';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';
import Results from './components/Pages/Results/Results';
import RescueTeams from './components/Pages/RescueTeams/RescueTeams';
import Alert from './components/Pages/Alert/Alert';
import About from './components/Pages/About/About';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/report" element={<Report />} />
              <Route path="/search-area" element={<SearchArea />} />
              <Route path="/search-pattern" element={<SearchPattern />} />
              <Route path="/results" element={<Results />} />
              <Route path="/rescue-teams" element={<RescueTeams />} />
              <Route path="/alert" element={<Alert />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
