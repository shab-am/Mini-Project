import {
  GET_HELP_POINTS,
  REMOVE_LOADER,
  RESET_HELP_POINTS,
  SHOW_DIALOG,
  SET_LOADER,
} from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getHelpPoints = () => async (dispatch) => {
  try {
    const state = store.getState();
    const radius = state.generalReducer.buffer_radius * 1000; // convert km to meters
    const crashPoint = state.searchAreaReducer.geojson.features[0].center;
    const crashPointString = `${crashPoint[0]},${crashPoint[1]}`;

    const hospitalQuery = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node[amenity=hospital](around:${radius},${crashPointString}););out body;`;
    const roadsQuery = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(node["highway"](around:${radius},${crashPointString});way["highway"](around:${radius},${crashPointString});relation["highway"](around:${radius},${crashPointString}););out body;>;out skel qt;`;

    const response = await axios.get(hospitalQuery);
    const geojsonData = osmtogeojson(response.data);

    dispatch({
      type: GET_HELP_POINTS,
      payload: geojsonData,
    });
  } catch (error) {
    console.error('Failed to fetch help points:', error);
    dispatch({
      type: SHOW_DIALOG,
      payload: {
        buttonText: 'OK',
        title: 'Help Points Data Fetch Failed',
        description: `Error: ${error.message}`,
        visible: true,
      },
    });
  }
};

export const resetHelpPoints = () => (dispatch) => {
  dispatch({
    type: RESET_HELP_POINTS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });
};
