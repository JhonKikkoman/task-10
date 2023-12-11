/** @format */

import { initT } from '../models';
import {
  SET_USER_INPUT_OBJ,
  PUSH_OBJ_IN_ARR,
  SET_EDIT,
  CLEAR_FIELDS,
} from './action';

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
      return {
        ...state,
        currentValue: {
          textValue: obj.textValue,
          numberValue: obj.numberValue,
        },
        userValue: obj,
      };
    case CLEAR_FIELDS:
      return {
        ...state,
        currentValue: {
          textValue: '',
          numberValue: '',
          id: '',
        },
      };
    case PUSH_OBJ_IN_ARR:
      const arr = state.arrUsersValue;
      arr.push(action.payload);
      return {
        ...state,
        arrUsersValue: [...arr],
      };
    case SET_EDIT:
      const filteredElem = state.arrUsersValue.filter(
        (e) => e.id === action.payload
      )[0];
      const newUsersArr = state.arrUsersValue.filter(
        (e) => e.id !== action.payload
      );
      return {
        ...state,
        currentValue: {
          textValue: filteredElem.textValue,
          numberValue: Number(filteredElem.numberValue),
        },
        arrUsersValue: newUsersArr,
      };
    default:
      return state;
  }
};
