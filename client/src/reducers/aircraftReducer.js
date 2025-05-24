import { createSlice } from '@reduxjs/toolkit';
import { SET_CURRENT_AIRCRAFT } from '../actions/types';

const initialState = {
  // your initial state here
};

const aircraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    // your reducers here
    [SET_CURRENT_AIRCRAFT]: (state, action) => {
      return action.payload;
    },
  },
});

export const { /* your actions */ } = aircraftSlice.actions;
export default aircraftSlice.reducer;
