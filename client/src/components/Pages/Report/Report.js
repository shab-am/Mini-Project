import React, { useEffect, useState } from 'react';
import './Report.scss';
import ReportForm from '../../layout/ReportForm/ReportForm';
import RecentReports from '../../layout/RecentReports/RecentReports';
import rescue from '../../../images/rescue.png';

const Report = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Report component mounted');
    console.log('Current URL:', window.location.pathname);
    
    // Add error handling
    try {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error in Report component:', err);
      setError(err.message);
    }
  }, []);

  // Add debug rendering
  console.log('Report component rendering, isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading Report Page...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error Loading Report Page</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className='report-main'>
      <div className='report-form'>
        <h2>Report Missing Aircraft</h2>
        <ReportForm />
      </div>
      <div className='sidecontent'>
        <img className='rescue-img' src={rescue} alt='Rescue illustration' />
        <div className='recent-reports'>
          <h3>Recent Reports</h3>
          <RecentReports />
        </div>
      </div>
    </main>
  );
};

export default Report;
