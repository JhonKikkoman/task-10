/** @format */

import { actionsT, initT, payloadT } from '../models';
import {
  SET_USER_INPUT_OBJ,
  SUBMIT_OR_CANCEL,
  SET_EDIT,
  SET_DELETE,
} from './action';

const initialState: initT = {
  inputValue: {
    textValue: '',
    numberValue: '',
    name: '',
    id: '',
  },
  isActive: false,
  arrUsersValue: [],
};

export const inputReducer = (state = initialState, action: actionsT) => {
  switch (action.type) {
    case SET_USER_INPUT_OBJ:
      return {
        ...state,
        inputValue: {
          textValue:
            action.payload.name === 'text_field'
              ? action.payload.textValue
              : state.inputValue.textValue,
          numberValue:
            action.payload.name === 'number_field'
              ? action.payload.numberValue
              : state.inputValue.numberValue,
        },
      };
    case SUBMIT_OR_CANCEL:
      const arr = state.arrUsersValue;
      arr.push(action.payload);
      return {
        ...state,
        inputValue: {
          textValue: '',
          numberValue: '',
        },
        isActive: false,
        arrUsersValue: [...arr],
      };
    case SET_EDIT:
      const filteredElem = state.arrUsersValue.filter(
        (e) => e.id === action.payload.id
      )[0];
      const newUsersArr = state.arrUsersValue.filter(
        (e) => e.id !== action.payload.id
      );
      return {
        ...state,
        inputValue: {
          textValue: filteredElem.textValue,
          numberValue: Number(filteredElem.numberValue),
          id: `${filteredElem.textValue}_${Number(filteredElem.numberValue)}`,
        },
        isActive: true,
        arrUsersValue: newUsersArr,
      };
    case SET_DELETE:
      const deletedElemArr = state.arrUsersValue.filter(
        (e) => e.id !== action.payload.id
      );
      return { ...state, arrUsersValue: deletedElemArr };
    default:
      return state;
  }
};
