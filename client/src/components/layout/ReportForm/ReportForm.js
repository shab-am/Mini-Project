import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import './ReportForm.scss';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showDialog } from '../../../actions/dialog';
import { createReport, getReports } from '../../../actions/report';
import { connect } from 'react-redux';
import { predictCoordinates } from '../../services/mlService';

const initialFormData = {
  latitude: '',
  longitude: '',
  velocity: '',
  direction: '',
  weather: '',
  description: '',
  altitude: '',
  title: '',
  category: '',
};

const dialogcontent = {
  title: 'Missing Aircraft Successfully Reported',
  description:
    'New missing aircraft has been added. Now you can checkout in recent aircrafts to proceed further for search area operations.',
  buttontext: 'Ok, I will',
};

const mapDispatchToProps = (dispatch) => ({
  showDialog: (payload) => dispatch(showDialog(payload)),
  getReports: () => dispatch(getReports()),
});

const ReportForm = ({ showDialog, getReports }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null);

  const onInputFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert direction from string to degrees
    const directionMap = {
      'north': 0,
      'northeast': 45,
      'east': 90,
      'southeast': 135,
      'south': 180,
      'southwest': 225,
      'west': 270,
      'northwest': 315
    };

    // Prepare data with proper types
    const formattedData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      velocity: parseFloat(formData.velocity),
      direction: directionMap[formData.direction.toLowerCase()] || 0,
      altitude: parseFloat(formData.altitude),
      category: parseInt(formData.category)
    };

    try {
      if (!formattedData.title || !formattedData.category) {
        dispatch(showDialog({
          title: 'Missing Required Fields',
          description: 'Please fill in all required fields (Title and Category)',
          buttontext: 'OK'
        }));
        return;
      }

      // Validate numeric ranges
      if (formattedData.latitude < -90 || formattedData.latitude > 90) {
        dispatch(showDialog({
          title: 'Invalid Latitude',
          description: 'Latitude must be between -90 and 90 degrees',
          buttontext: 'OK'
        }));
        return;
      }

      if (formattedData.longitude < -180 || formattedData.longitude > 180) {
        dispatch(showDialog({
          title: 'Invalid Longitude',
          description: 'Longitude must be between -180 and 180 degrees',
          buttontext: 'OK'
        }));
        return;
      }

      if (formattedData.velocity < 0) {
        dispatch(showDialog({
          title: 'Invalid Velocity',
          description: 'Velocity must be a positive number',
          buttontext: 'OK'
        }));
        return;
      }

      if (formattedData.altitude < 0) {
        dispatch(showDialog({
          title: 'Invalid Altitude',
          description: 'Altitude must be a positive number',
          buttontext: 'OK'
        }));
        return;
      }

      // Call the ML API
      const result = await predictCoordinates(formattedData);
      setPrediction(result);

      // Submit the report
      await dispatch(createReport(formattedData));
      
      // Clear the form
      setFormData(initialFormData);
      
      // Show success message
      dispatch(showDialog({
        title: 'Success!',
        description: 'Aircraft report has been successfully submitted.',
        buttontext: 'OK'
      }));
    } catch (err) {
      console.error('Error submitting report:', err);
      dispatch(showDialog({
        title: 'Error Submitting Report',
        description: err.response?.data?.message || 'There was an error submitting your report. Please try again.',
        buttontext: 'OK'
      }));
    }
  };

  return (
    <Box className="report-form-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Report Missing Aircraft
      </Typography>
      <form className='reportForm' onSubmit={handleSubmit}>
        <div>
          <TextField
            value={formData.title}
            name='title'
            label='Title'
            onChange={onInputFieldChange}
            fullWidth
            required
          />
        </div>
        <div>
          <FormControl fullWidth required>
            <InputLabel id='category-label'>Category</InputLabel>
            <Select
              name='category'
              labelId='category-label'
              value={formData.category}
              label='Category'
              onChange={onInputFieldChange}
              required
            >
              <MenuItem value={1}>Category A</MenuItem>
              <MenuItem value={2}>Category B</MenuItem>
              <MenuItem value={3}>Category C</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='position'>
          <TextField
            className='lat'
            name='latitude'
            value={formData.latitude}
            label='Latitude'
            onChange={onInputFieldChange}
            fullWidth
          />
          <TextField
            className='lon'
            value={formData.longitude}
            name='longitude'
            label='Longitude'
            onChange={onInputFieldChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            type='number'
            value={formData.velocity}
            name='velocity'
            label='Velocity(km/hr)'
            onChange={onInputFieldChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            name='direction'
            value={formData.direction}
            onChange={onInputFieldChange}
            label='Direction'
            fullWidth
          />
        </div>
        <div>
          <TextField
            name='weather'
            value={formData.weather}
            label='Weather'
            onChange={onInputFieldChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            name='altitude'
            value={formData.altitude}
            onChange={onInputFieldChange}
            type='number'
            label='Altitude'
            fullWidth
          />
        </div>
        <div>
          <TextField
            name='description'
            multiline
            maxRows={4}
            label='Description'
            value={formData.description}
            onChange={onInputFieldChange}
            fullWidth
          />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            Submit Report
          </Button>
        </div>
      </form>
      {prediction && (
        <div>
          <h3>Predicted Crash Coordinates</h3>
          <p>Latitude: {prediction.Crash_Latitude}</p>
          <p>Longitude: {prediction.Crash_Longitude}</p>
        </div>
      )}
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(ReportForm);
