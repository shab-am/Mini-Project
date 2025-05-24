import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
  SET_SUBAREA_SIDE,
  SET_LOADER,
  REMOVE_LOADER,
} from '../actions/types';

// Using const for immutable state
const initialState = {
  loader: false,
  buffer_radius: 10,
  buffer_distance: 10,
  subarea_side: 7,
  additional_points_checkboxes: {
    roads: false,
    hospitals: false,
    others: false,
  },
};

// Using arrow function and more concise syntax
const generalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BUFFER_RADIUS:
    case SET_BUFFER_DISTANCE:
    case SET_SUBAREA_SIDE:
    case SET_LOADER:
    case REMOVE_LOADER:
      return { ...state, [type === SET_BUFFER_RADIUS ? 'buffer_radius' :
                         type === SET_BUFFER_DISTANCE ? 'buffer_distance' :
                         type === SET_SUBAREA_SIDE ? 'subarea_side' : 'loader']: payload };
    
    case SET_ADDITIONAL_POINTS_CHECKBOXES:
      return { ...state, additional_points_checkboxes: payload };
    
    default:
      return state;
  }
};

export default generalReducer;
