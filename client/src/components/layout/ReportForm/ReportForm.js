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
import { showDialog } from '../../../actions/dialog';
import { createReport } from '../../../actions/report';
import { predictCoordinates } from '../../../services/mlServices';
import { setPredictedCoordinates } from '../../../actions/prediction';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  title: '',
  category: '',
  Aircraft_Name: '',
  LKP_Latitude: '',
  LKP_Longitude: '',
  Speed_knots: '',
  Heading_deg: '',
  Altitude_ft: '',
  Time_since_last_contact_min: '',
  // Removed: Wind_speed_knots, Wind_direction_deg, weather, description
};

const ReportForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    // Validate required fields
    if (!formData.title || !formData.category) {
      dispatch(showDialog({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields (Title and Category)',
        buttontext: 'OK'
      }));
      return;
    }

    // Prepare data for ML API
    const mlInput = {
      LKP_Latitude: Number(formData.LKP_Latitude),
      LKP_Longitude: Number(formData.LKP_Longitude),
      Speed_knots: Number(formData.Speed_knots),
      Heading_deg: Number(formData.Heading_deg),
      Altitude_ft: Number(formData.Altitude_ft),
      Time_since_last_contact_min: Number(formData.Time_since_last_contact_min),
      Wind_speed_knots: 0, // or average value from your dataset
      Wind_direction_deg: 0, // or average value
      Aircraft_Name: formData.Aircraft_Name
    };

    try {
      // 1. Get prediction from ML API
      const result = await predictCoordinates(mlInput);
      setPrediction(result);

      // 6. Dispatch predicted coordinates to Redux (move this up!)
      const coords = { latitude: result.Crash_Latitude, longitude: result.Crash_Longitude };
      console.log("About to dispatch predicted coordinates:", coords);
      dispatch(setPredictedCoordinates(coords));
      console.log("Dispatched predicted coordinates");

      // 2. Prepare data for backend (Node/Express)
      const backendData = {
        latitude: formData.LKP_Latitude,
        longitude: formData.LKP_Longitude,
        velocity: formData.Speed_knots,
        direction: formData.Heading_deg,
        altitude: formData.Altitude_ft,
        title: formData.title,
        category: formData.category,
        weather: '',
        description: '',
        predicted_latitude: result.Crash_Latitude,
        predicted_longitude: result.Crash_Longitude,
      };

      // 3. Save report to backend
      await dispatch(createReport(backendData));

      // 4. Show success dialog
      dispatch(showDialog({
        title: 'Success!',
        description: 'Aircraft report has been successfully submitted.',
        buttontext: 'OK'
      }));

      // 5. Clear form
      setFormData(initialFormData);

    } catch (err) {
      dispatch(showDialog({
        title: 'Error Submitting Report',
        description: err.message || 'There was an error submitting your report. Please try again.',
        buttontext: 'OK'
      }));
    }
  };

  const handleViewOnMap = () => {
    navigate('/search-area', { state: { fromReport: true } });
  };

  return (
    <Box className="report-form-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Report Missing Aircraft
      </Typography>
      <form className='reportForm' onSubmit={handleSubmit}>
        <TextField name='title' label='Title' value={formData.title} onChange={onInputFieldChange} fullWidth required />
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
        <TextField name='Aircraft_Name' label='Aircraft Name' value={formData.Aircraft_Name} onChange={onInputFieldChange} fullWidth required />
        <TextField name='LKP_Latitude' label='LKP Latitude' value={formData.LKP_Latitude} onChange={onInputFieldChange} fullWidth required />
        <TextField name='LKP_Longitude' label='LKP Longitude' value={formData.LKP_Longitude} onChange={onInputFieldChange} fullWidth required />
        <TextField name='Speed_knots' label='Speed (knots)' value={formData.Speed_knots} onChange={onInputFieldChange} fullWidth required />
        <TextField name='Heading_deg' label='Heading (deg)' value={formData.Heading_deg} onChange={onInputFieldChange} fullWidth required />
        <TextField name='Altitude_ft' label='Altitude (ft)' value={formData.Altitude_ft} onChange={onInputFieldChange} fullWidth required />
        <TextField name='Time_since_last_contact_min' label='Time Since Last Contact (min)' value={formData.Time_since_last_contact_min} onChange={onInputFieldChange} fullWidth required />
        <Button variant='contained' color='primary' type='submit'>
          Submit Report
        </Button>
      </form>
      {prediction && (
        <div>
          <div>
            <strong>Predicted Crash Coordinates</strong><br />
            Latitude: {prediction.Crash_Latitude}<br />
            Longitude: {prediction.Crash_Longitude}
          </div>
          <button onClick={handleViewOnMap}>View on Map</button>
        </div>
      )}
    </Box>
  );
};

export default ReportForm;
