import React from 'react';
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
import { useState } from 'react';
import axios from 'axios';
import { showDialog } from '../../../actions/dialog';
import { getReports } from '../../../actions/report';
import { connect } from 'react-redux';

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
  const [formData, setFormData] = useState(initialFormData);

  const onInputFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitDataToAPI = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reportAircraft', formData);
      console.log(res.data);
      setFormData(initialFormData);
      getReports();
      showDialog(dialogcontent);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="report-form-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Report Missing Aircraft
      </Typography>
      <form className='reportForm' onSubmit={submitDataToAPI}>
        <div>
          <TextField
            value={formData.title}
            name='title'
            label='Title'
            onChange={onInputFieldChange}
            fullWidth
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id='category-label'>Category</InputLabel>
            <Select
              name='category'
              labelId='category-label'
              value={formData.category}
              label='Category'
              onChange={onInputFieldChange}
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
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(ReportForm);
