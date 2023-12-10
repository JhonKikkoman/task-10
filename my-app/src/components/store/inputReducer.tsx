/** @format */

import { SET_USER_INPUT } from './action';

const initialState = { textValue: '', numberValue: '', id: '' };

export const inputReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INPUT:
      const item = action.payload;
      return { ...state, item };
    default:
      return state;
  }
};
