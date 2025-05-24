import {
  GET_AREA,
  ASSIGN_RESCUE_TEAM,
  ADD_SEARCH_PATTERN,
  ASSIGN_PATTERN_TYPE,
  SET_LOADER,
  REMOVE_LOADER,
} from './types';
import axios from 'axios';
import { showDialog } from './dialog';
import store from '../store';

export const getSearchArea = () => async (dispatch) => {
  const { buffer_distance, subarea_side } = store.getState().generalReducer;
  const { _id: current_aircraft_id } = store.getState().aircraftReducer;

  try {
    dispatch({ type: SET_LOADER, payload: true });

    const { data: area_data } = await axios.get(
      `api/searchArea/${current_aircraft_id}?side=${buffer_distance}&gridSide=${subarea_side}`
    );

    dispatch({ type: REMOVE_LOADER, payload: false });
    dispatch({ type: GET_AREA, payload: area_data });
  } catch (error) {
    dispatch({ type: REMOVE_LOADER, payload: false });
    console.error('Error fetching search area:', error);

    dispatch(
      showDialog({
        title: 'Error Fetching Search Area',
        description: error.message,
        buttontext: 'OK',
        visible: true,
      })
    );
  }
};

export const assignRescueTeam = (tile_index, rescue_team) => async (dispatch) => {
  try {
    dispatch({
      type: ASSIGN_RESCUE_TEAM,
      payload: { tile_index, rescue_team },
    });
  } catch (error) {
    console.error('Error assigning rescue team:', error);
    dispatch(
      showDialog({
        title: 'Error Assigning Emergency Vehicle',
        description: error.message,
        buttontext: 'OK',
        visible: true,
      })
    );
  }
};

export const assignPatternType = (tile_index, pattern_type) => async (dispatch) => {
  try {
    dispatch({
      type: ASSIGN_PATTERN_TYPE,
      payload: { tile_index, pattern_type },
    });
  } catch (error) {
    console.error('Error assigning pattern type:', error);
    dispatch(
      showDialog({
        title: 'Error Assigning Pattern',
        description: error.message,
        buttontext: 'OK',
        visible: true,
      })
    );
  }
};

export const addSearchPattern = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SEARCH_PATTERN,
      payload: data,
    });
  } catch (error) {
    console.error('Error adding search pattern:', error);
    dispatch(
      showDialog({
        title: 'Error Adding Search Pattern',
        description: error.message,
        buttontext: 'OK',
        visible: true,
      })
    );
  }
};
