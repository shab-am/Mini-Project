import { GET_HELP_POINTS, RESET_HELP_POINTS } from '../actions/types';

const initialState = {
  type: 'FeatureCollection',
  features: [],
};

const helpPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HELP_POINTS:
    case RESET_HELP_POINTS:
      return action.payload;
    default:
      return state;
  }
};

export default helpPointsReducer;
