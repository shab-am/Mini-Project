import { createAction } from '@reduxjs/toolkit';
import {
  SET_BUFFER_RADIUS,
  SET_BUFFER_DISTANCE,
  SET_ADDITIONAL_POINTS_CHECKBOXES,
  SET_SUBAREA_SIDE,
  SET_LOADER,
  REMOVE_LOADER,
} from './types';

// Using createAction for simpler action creators
export const setBufferRadius = createAction(SET_BUFFER_RADIUS);
export const setSubareaSide = createAction(SET_SUBAREA_SIDE);
export const setBufferDistance = createAction(SET_BUFFER_DISTANCE);
export const setAdditionalPointsCheckboxes = createAction(SET_ADDITIONAL_POINTS_CHECKBOXES);
export const setLoader = createAction(SET_LOADER, () => ({ payload: true }));
export const removeLoader = createAction(REMOVE_LOADER, () => ({ payload: false }));
