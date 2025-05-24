import { CREATE_REPORT, DELETE_REPORT, GET_REPORTS } from '../actions/types';

const initialState = [];

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return [...state, action.payload];
    case DELETE_REPORT:
      return state.filter(report => report.id !== action.payload);
    case GET_REPORTS:
      return [...action.payload];
    default:
      return state;
  }
};

export default reportReducer;
