import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span>Air Support</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/report" className="nav-link">Report</Link>
          <Link to="/search" className="nav-link">Search</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
