import {
  ASSIGN_RESCUE_TEAM,
  ASSIGN_PATTERN_TYPE,
  GET_AREA,
  RESET_AREA,
  ADD_SEARCH_PATTERN,
} from '../actions/types';

const initialState = {
  id: 'abc',

  geojson: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          NA: 'Load the search area first',
        },
      },
    ],
  },
  filteredGrid: {
    type: 'featurecollection',
    features: [],
  },
};

function searchAreaReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AREA:
      return action.payload;
    case RESET_AREA:
      return initialState;
    case ASSIGN_RESCUE_TEAM:
      return {
        ...state,
        filteredGrid: {
          ...state.filteredGrid,
          features: state.filteredGrid.features.map((feature, index) => 
            index === action.payload.tile_index
              ? { ...feature, rescue_team: action.payload.rescue_team }
              : feature
          )
        }
      };
    case ASSIGN_PATTERN_TYPE:
      return {
        ...state,
        filteredGrid: {
          ...state.filteredGrid,
          features: state.filteredGrid.features.map((feature, index) => 
            index === action.payload.tile_index
              ? { ...feature, pattern_type: action.payload.pattern_type }
              : feature
          )
        }
      };
    case ADD_SEARCH_PATTERN:
      return action.payload;
    default:
      return state;
  }
}

export default searchAreaReducer;
