import { GET_ROADS, SHOW_DIALOG, RESET_ROADS } from './types';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import store from '../store';

export const getRoads = () => async (dispatch) => {
  try {
    // Reset the data first
    await dispatch({
      type: RESET_ROADS,
      payload: {
        type: 'FeatureCollection',
        features: [],
      },
    });

    const state = store.getState();
    const crashPoint = state.searchAreaReducer.geojson.features[0].center;
    const bufferDistance = state.generalReducer.buffer_distance * 1000;

    const crashPointString = crashPoint.join(',');
    const roadsQuery = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:50];(way["highway"](around:${bufferDistance},${crashPointString});relation["highway"](around:${bufferDistance},${crashPointString}););out body;>;out skel qt;`;

    const { data } = await axios.get(roadsQuery);
    const geoJsonData = osmtogeojson(data);

    dispatch({
      type: GET_ROADS,
      payload: geoJsonData,
    });
  } catch (error) {
    console.error('Failed to fetch roads data:', error);
    dispatch({
      type: SHOW_DIALOG,
      payload: {
        buttonText: 'OK',
        title: 'Roads Data Fetch Failed',
        description: error.message || 'An unexpected error occurred',
        visible: true,
      },
    });
  }
};

export const resetRoads = () => (dispatch) => {
  dispatch({
    type: RESET_ROADS,
    payload: {
      type: 'FeatureCollection',
      features: [],
    },
  });
};
