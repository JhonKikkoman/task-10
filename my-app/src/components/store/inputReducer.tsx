/** @format */

import { actionsT, initT } from '../models';
import {
  SET_USER_INPUT_OBJ,
  SET_CANCEL,
  SET_SUBMIT,
  SET_EDIT,
  SET_DELETE,
  SET_FILTER,
} from './action';

const initialState: initT = {
  inputValue: {
    textValue: '',
    numberValue: '',
    name: '',
    id: '',
  },
  cacheObj: {
    textValue: '',
    numberValue: '',
    id: '',
  },
  isActive: false,
  arrUsersValue: [],
  filterInputValue: '',
  cacheFilterArr: [],
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
    case SET_SUBMIT:
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
    case SET_CANCEL:
      const prevArr = state.arrUsersValue;
      prevArr.push(state.cacheObj);
      return {
        ...state,
        inputValue: {
          textValue: '',
          numberValue: '',
        },
        isActive: false,
        arrUsersValue: [...prevArr],
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
        cacheObj: {
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
    case SET_FILTER:
      const filter = state.arrUsersValue.filter((item) => {
        if (
          item.textValue
            .toLowerCase()
            .trim()
            .includes(action.payload.str.toLowerCase().trim())
        ) {
          return item;
        }
      });
      return {
        ...state,
        filterInputValue: action.payload.str,
        cacheFilterArr: filter,
      };
    default:
      return state;
  }
};
