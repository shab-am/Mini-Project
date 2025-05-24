import { GET_REPORTS } from './types';
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
    const { data: reports } = await axios.get('api/reportAircraft');
    console.log(reports);

    dispatch({
      type: GET_REPORTS,
      payload: reports,
    });
  } catch (error) {
    console.error('Error fetching reports:', error.message);

    dispatch(
      showDialog({
        title: 'Oops! Error from server',
        description: error.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
  }
};

// get all the reports of missing aircrafts from database
export const deleteReport = (id) => async (dispatch) => {
  try {
    const { data: responseMessage } = await axios.delete(`api/reportAircraft/${id}`);
    console.log(responseMessage);

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
  } catch (error) {
    console.error('Error deleting report:', error.message);
    dispatch(
      showDialog({
        title: 'Oops! Error from server',
        description: error.message,
        buttontext: 'Ok! Let me check',
        visible: true,
      })
    );
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
