import { SHOW_DIALOG } from '../actions/types';

const initialState = {
  title: '',
  description: '',
  buttonText: '',
  visible: false,
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default dialogReducer;
