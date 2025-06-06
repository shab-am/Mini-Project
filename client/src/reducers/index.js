import { combineReducers } from 'redux';
import dialogReducer from './dialogReducer';
import reportReducer from './reportReducer';
import aircraftReducer from './aircraftReducer';
import searchAreaReducer from './searchAreaReducer';
import helpPointsReducer from './helpPointsReducer';
import roadsReducer from './roadsReducer';
import generalReducer from './generalReducer';
import predictionReducer from './predictionReducer';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  report: reportReducer,
  aircraft: aircraftReducer,
  searchArea: searchAreaReducer, 
  helpPoints: helpPointsReducer,
  roads: roadsReducer,
  general: generalReducer,
  predictionReducer,
});

export default rootReducer;
