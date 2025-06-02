import { GET_REPORTS, CREATE_REPORT, DELETE_REPORT } from './types';
import {
  SET_CURRENT_AIRCRAFT,
  RESET_HELP_POINTS,
  RESET_ROADS,
  RESET_AREA,
} from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

// get all the reports of missing aircrafts from database
export const getReports = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/reportAircraft');
    dispatch({
      type: GET_REPORTS,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching reports:', err);
    throw err;
  }
};

// get all the reports of missing aircrafts from database
export const deleteReport = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/reportAircraft/${id}`);
    dispatch({
      type: DELETE_REPORT,
      payload: id
    });

    if (store.getState().aircraftReducer._id === id) {
      dispatch(setCurrentAircraft({}));
      dispatch(
        showDialog({
          title: 'Current Aircraft Deleted',
          description: 'The aircraft you deleted has been removed from the current Aircraft for Search And Rescue Operations. You can choose a new one.',
          buttontext: 'Ok! Let me choose',
          visible: true,
        })
      );
    }

    dispatch(getReports());
  } catch (err) {
    console.error('Error deleting report:', err);
    throw err;
  }
};

// set the current aircraft
export const setCurrentAircraft = (aircraft) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_AIRCRAFT,
    payload: aircraft,
  });

  dispatch({
    type: RESET_AREA,
    payload: '',
  });

  dispatch({
    type: RESET_HELP_POINTS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  dispatch({
    type: RESET_ROADS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });

  dispatch(
    showDialog({
      title: 'Missing Aircraft Set for Search and Rescue calculations',
      description: `Now, this aircraft ${aircraft.title} is the target to search and rescue.`,
      buttontext: 'Ok!',
      visible: true,
    })
  );
};

// Action creator for creating a report
export const createReport = (reportData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/reportAircraft', reportData);
    dispatch({
      type: CREATE_REPORT,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    console.error('Error creating report:', err);
    throw err;
  }
};
