import { GET_ROADS, RESET_ROADS } from '../actions/types';

const initialState = {
  type: 'FeatureCollection',
  features: [],
};

// Using arrow function syntax and more concise switch statement
const roadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROADS:
    case RESET_ROADS:
      return action.payload;
    default:
      return state;
  }
};

export default roadsReducer;
