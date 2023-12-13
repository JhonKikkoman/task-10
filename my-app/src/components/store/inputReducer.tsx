/** @format */

import { initT } from '../models';
import {
  SET_USER_INPUT_OBJ,
  PUSH_OBJ_IN_ARR,
  SET_EDIT,
  SET_CANCEL,
} from './action';

const initialState: initT = {
  inputValue: {
    textValue: '',
    numberValue: '',
  },
  userValue: {
    textValue: '',
    numberValue: '',
    id: '',
    boo: false,
  },
  arrUsersValue: [],
};

export const inputReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_USER_INPUT_OBJ:
      const obj = action.payload;
      return {
        ...state,
        inputValue: {
          textValue: obj.textValue,
          numberValue: obj.numberValue,
        },
        userValue: obj,
      };
    case PUSH_OBJ_IN_ARR:
      const arr = state.arrUsersValue;
      arr.push(action.payload);
      return {
        ...state,
        inputValue: {
          textValue: '',
          numberValue: '',
        },
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
        inputValue: {
          textValue: filteredElem.textValue,
          numberValue: Number(filteredElem.numberValue),
        },
        userValue: {
          textValue: filteredElem.textValue,
          numberValue: Number(filteredElem.numberValue),
          id: `${filteredElem.textValue}_${Number(filteredElem.numberValue)}`,
          boo: true,
        },
        arrUsersValue: newUsersArr,
      };
    case SET_CANCEL:
      return {
        ...state,
        inputValue: {
          textValue: '',
          numberValue: '',
        },
        userValue: {
          textValue: '',
          numberValue: '',
          id: '',
          boo: false,
        },
      };
    default:
      return state;
  }
};
