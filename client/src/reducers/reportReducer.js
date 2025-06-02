import { GET_REPORTS, CREATE_REPORT, DELETE_REPORT } from '../actions/types';

const initialState = [];

const reportReducer = (state = initialState, action) => {
  console.log('reportReducer - action:', action);
  
  switch (action.type) {
    case GET_REPORTS:
      console.log('Getting all reports:', action.payload);
      return action.payload;
    case CREATE_REPORT:
      console.log('Creating new report:', action.payload);
      return [...state, action.payload];
    case DELETE_REPORT:
      return state.filter(report => report._id !== action.payload);
    default:
      return state;
  }
};

export default reportReducer;
