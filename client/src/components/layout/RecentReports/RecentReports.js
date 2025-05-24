import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  getReports,
  deleteReport,
  setCurrentAircraft,
} from '../../../actions/report';
import './RecentReports.scss';

const RecentReports = () => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const reportsArray = useSelector((state) => state.reportReducer) || [];

  let data = [];
  if (reportsArray.length > 3) {
    data = reportsArray
      .slice(reportsArray.length - 3, reportsArray.length)
      .reverse();
  } else {
    data = reportsArray.reverse();
  }

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await dispatch(getReports());
      } catch (err) {
        setError('Failed to fetch reports. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReport(id));
  };

  const handleSetCurrentAircraft = (item) => {
    dispatch(setCurrentAircraft(item));
  };

  return showAll ? (
    <div className='recent-container'>
      <div className='heading'>
        <h4>Recent Missing Flights</h4>
        <div
          className='show_all'
          onClick={() => setShowAll(false)}
        >
          Show Less
        </div>
      </div>
      {isLoading ? (
        <div className='loading'>Loading reports...</div>
      ) : error ? (
        <div className='error'>{error}</div>
      ) : reportsArray && reportsArray.length > 0 ? (
        <div className='cards-section'>
          {reportsArray.map((item) => (
            <Card className='card' key={item._id}>
              <p>{item.title}</p>
              <div className='bottom'>
                <Link to='/search-area'>
                  <IconButton
                    onClick={() => handleSetCurrentAircraft(item)}
                    aria-label='rescue'
                  >
                    <i className='fas fa-paper-plane fa-sm'></i>
                  </IconButton>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDelete(item._id)}
                >
                  <i className='fas fa-trash fa-sm'></i>
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className='no-reports'>
          No recent reports available
        </div>
      )}
    </div>
  ) : (
    <div className='recent-container'>
      <div className='heading'>
        <h4>Recent Missing Flights</h4>
        <div
          className='show_all'
          onClick={() => setShowAll(true)}
        >
          Show All
        </div>
      </div>
      {isLoading ? (
        <div className='loading'>Loading reports...</div>
      ) : error ? (
        <div className='error'>{error}</div>
      ) : reportsArray && reportsArray.length > 0 ? (
        <div className='cards-section'>
          {data.map((item) => (
            <Card className='card' key={item._id}>
              <p>{item.title}</p>
              <div className='bottom'>
                <Link to='/search-area'>
                  <IconButton
                    onClick={() => handleSetCurrentAircraft(item)}
                    aria-label='rescue'
                  >
                    <i className='fas fa-paper-plane fa-sm'></i>
                  </IconButton>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleDelete(item._id)}
                >
                  <i className='fas fa-trash fa-sm'></i>
                </IconButton>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className='no-reports'>
          No recent reports available
        </div>
      )}
    </div>
  );
};

export default RecentReports;
