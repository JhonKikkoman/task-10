/** @format */

import { stateInputT } from '../models';
import { SET_USER_INPUT_OBJ, PUSH_OBJ_IN_ARR, SET_EDIT } from './action';

type initT = {
  currentValue: {
    textValue: string;
    numberValue: string;
    id: string;
  };
  userValue: {};
  arrUsersValue: stateInputT[];
};

const initialState: initT = {
  currentValue: {
    textValue: '',
    numberValue: '',
    id: '',
  },
  userValue: {},
  arrUsersValue: [],
};

export const inputReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INPUT_OBJ:
      const obj = action.payload;
      return { ...state, userValue: obj };
    case PUSH_OBJ_IN_ARR:
      const arr = state.arrUsersValue;
      arr.push(action.payload);
      return {
        ...state,
        arrUsersValue: [...arr],
      };
    case SET_EDIT:
      return;
    default:
      return state;
  }
};
