import React, { useEffect } from 'react';
import { FormControl, FormControlLabel, Radio } from '@mui/material';
import TextField from '@mui/material/TextField';
import chart from '../../../images/chart.png';
import radius from '../../../images/radius.png';
import foreground from '../../../images/foreground.png';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { connect } from 'react-redux';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import './AreaTypeSelector.scss';
import { FormGroup } from '@mui/material';
import { getRoads, resetRoads } from '../../../actions/roads';
import { getHelpPoints, resetHelpPoints } from '../../../actions/helpPoints';
import {
  setBufferDistance,
  setBufferRadius,
  setAdditionalPointsCheckboxes,
  setSubareaSide,
} from '../../../actions/general';

const mapStateToProps = (state) => {
  return {
    bufferRadius: state.generalReducer.buffer_radius,
    bufferDistance: state.generalReducer.buffer_distance,
    subareaSide: state.generalReducer.subarea_side,
    additionalPointsCheckboxes:
      state.generalReducer.additional_points_checkboxes,
  };
};

const AreaTypeSelector = (props) => {
  const [value, setValue] = React.useState('circle');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckBox = (event) => {
    props.setAdditionalPointsCheckboxes({
      ...props.additionalPointsCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBufferRadius = (event) => {
    props.setBufferRadius(event.target.value);
  };

  const handleBufferDistance = (event) => {
    props.setBufferDistance(event.target.value);
  };

  const handleSubareaSide = (event) => {
    props.setSubareaSide(event.target.value);
  };

  // use effect, to fetch the data , when checkbox state is updated

  useEffect(() => {
    if (props.additionalPointsCheckboxes.hospitals) {
      props.getHelpPoints();
    } else {
      props.resetHelpPoints();
    }
  }, [props.additionalPointsCheckboxes.hospitals, props]);
  useEffect(() => {
    if (props.additionalPointsCheckboxes.roads) {
      props.getRoads();
    } else {
      props.resetRoads();
    }
  }, [props.additionalPointsCheckboxes.roads, props]);
  useEffect(() => {
    if (props.additionalPointsCheckboxes.others) {
      console.log('others called');
    }
  }, [props.additionalPointsCheckboxes.others]);

  return (
    <Grid container className='areatypeselector'>
      {/* <Grid item xs={4} className='main-item'>
        <FormControl component='div'>
          <FormLabel component='legend'>Select Search Area Type</FormLabel>
          <RadioGroup name='areatype' value={value} onChange={handleChange} row>
            <FormControlLabel
              value='circle'
              control={<Radio />}
              label='Circluar'
            />
            <FormControlLabel
              value='rectangle'
              control={<Radio />}
              label='Rectangular'
            />
            <FormControlLabel
              value='accurate'
              control={<Radio />}
              label='Accurate'
            />
          </RadioGroup>
        </FormControl>
      </Grid> */}

      <Grid item xs={4} className='main-item'>
        <FormControl component='div' className='checkboxgroup'>
          <FormLabel component='legend'>Load Additional Information</FormLabel>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name='roads'
                  color='secondary'
                  onChange={handleCheckBox}
                  checked={props.additionalPointsCheckboxes.roads}
                  size="medium"
                />
              }
              label='Roads'
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='hospitals'
                  color='secondary'
                  onChange={handleCheckBox}
                  checked={props.additionalPointsCheckboxes.hospitals}
                  size="medium"
                />
              }
              label='Hospitals'
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='others'
                  color='secondary'
                  onChange={handleCheckBox}
                  checked={props.additionalPointsCheckboxes.others}
                  size="medium"
                />
              }
              label='Others'
            />
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={4}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img src={radius} alt='x' style={{ width: '2rem', height: '2rem' }} />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='Helper Data Radius(Km)'
            defaultValue={props.bufferRadius}
            onChange={handleBufferRadius}
            type='number'
            size="medium"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={4}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img
            src={foreground}
            alt='x'
            style={{ width: '2rem', height: '2rem' }}
          />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='Sub Area Side(Km)'
            defaultValue={props.subareaSide}
            onChange={handleSubareaSide}
            type='number'
            size="medium"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={4}
        spacing={1}
        className='main-item'
        alignItems='center'
      >
        <Grid item>
          <img src={chart} alt='x' style={{ width: '2rem', height: '2rem' }} />
        </Grid>
        <Grid item>
          <TextField
            color='secondary'
            id='outlined-basic'
            label='SearchArea Buffer(Km)'
            defaultValue={props.bufferDistance}
            onChange={handleBufferDistance}
            type='number'
            size="medium"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, {
  getRoads,
  getHelpPoints,
  resetRoads,
  resetHelpPoints,
  setBufferRadius,
  setBufferDistance,
  setAdditionalPointsCheckboxes,
  setSubareaSide,
})(AreaTypeSelector);
