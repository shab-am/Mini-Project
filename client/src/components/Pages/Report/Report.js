import React, { useEffect, useState } from 'react';
import './Report.scss';
import ReportForm from '../../layout/ReportForm/ReportForm';
import rescue from '../../../images/rescue.png';

const Report = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Report component mounted');
    console.log('Current URL:', window.location.pathname);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading Report Page...</h2>
      </div>
    );
  }

  return (
    <main className='report-main'>
      <div className='report-content'>
        <div className='image-section'>
          <img className='rescue-img' src={rescue} alt='Rescue illustration' />
        </div>
        <div className='form-section'>
          <h2>Report Missing Aircraft</h2>
          <ReportForm />
        </div>
      </div>
    </main>
  );
};

export default Report;
