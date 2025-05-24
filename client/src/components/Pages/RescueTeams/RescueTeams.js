import './RescueTeams.scss';
import rightArrow from '../../../images/right-arrow.png';
import fighter from '../../../images/fighter.png';
import drone_icon from '../../../images/drone.png';
import helicopter from '../../../images/helicopter.png';
import one from '../../../images/1.png';
import two from '../../../images/2.png';
import three from '../../../images/3.png';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const RescueTeams = () => {
  const [helicopterA, setHelicopterA] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });
  const [helicopterB, setHelicopterB] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });
  const [drone, setDrone] = useState({
    fieldofview: 0,
    speed: 0,
    type: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/rescueTeam`);
        const data = response.data;
        setHelicopterA(data[0]);
        setHelicopterB(data[1]);
        setDrone(data[2]);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (setter) => (event) => {
    setter(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmission = async (data) => {
    try {
      const response = await axios.put('api/rescueTeam', data);
      console.log('Update successful:', response);
    } catch (err) {
      console.error('Error updating data:', err.message);
    }
  };

  return (
    <div className='topcontent'>
      <div className='middle'>
        <div className='header'>
          <h2>Update Rescue Teams</h2>
        </div>
        <h3 className='middle-heading'>
          These updates will reflect in the realtime rescue operation.
        </h3>
        <div className='cards'>
          <div className='card'>
            <img src={one} className='badge' alt='' />
            <h4>Helicopter A</h4>
            <img className='main-image' src={fighter} alt='' />
            <Box sx={{ '& > *': { m: 1, width: '92%' } }}>
              <TextField
                label='Speed (in Kms)'
                onChange={handleChange(setHelicopterA)}
                value={helicopterA.speed}
                size='small'
                name='speed'
              />
              <TextField
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handleChange(setHelicopterA)}
                value={helicopterA.fieldofview}
                size='small'
              />
              <Button
                onClick={() => handleSubmission(helicopterA)}
                color='primary'
                variant='contained'
                size='small'
              >
                Update
              </Button>
            </Box>
          </div>
          
          <img className='arrow' src={rightArrow} alt='' />
          
          <div className='card'>
            <img src={two} className='badge' alt='' />
            <h4>Helicopter B</h4>
            <img className='main-image' src={helicopter} alt='' />
            <Box sx={{ '& > *': { m: 1, width: '92%' } }}>
              <TextField
                label='Speed (in Kms)'
                onChange={handleChange(setHelicopterB)}
                value={helicopterB.speed}
                size='small'
                name='speed'
              />
              <TextField
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handleChange(setHelicopterB)}
                value={helicopterB.fieldofview}
                size='small'
              />
              <Button
                onClick={() => handleSubmission(helicopterB)}
                color='primary'
                variant='contained'
                size='small'
              >
                Update
              </Button>
            </Box>
          </div>
          
          <img className='arrow' src={rightArrow} alt='' />
          
          <div className='card'>
            <img src={three} className='badge' alt='' />
            <h4>Drone</h4>
            <img className='main-image' src={drone_icon} alt='' />
            <Box sx={{ '& > *': { m: 1, width: '92%' } }}>
              <TextField
                label='Speed (in Kms)'
                onChange={handleChange(setDrone)}
                value={drone.speed}
                size='small'
                name='speed'
              />
              <TextField
                label='Field Of View (in Kms)'
                name='fieldofview'
                onChange={handleChange(setDrone)}
                value={drone.fieldofview}
                size='small'
              />
              <Button
                onClick={() => handleSubmission(drone)}
                color='primary'
                variant='contained'
                size='small'
              >
                Update
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueTeams; 