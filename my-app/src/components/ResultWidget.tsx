/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { initT, propT, stateInputT } from './models';
import { SET_DELETE, SET_EDIT } from './store/action';

export function ResultWidget({ propArr, ClbkResult }: propT) {
  const { arrUsersValue, filterInputValue, cacheFilterArr } = useSelector(
    (state: { input: initT }) => state.input
  );
  const dispatch = useDispatch();
  const whichOne = filterInputValue === '' ? arrUsersValue : cacheFilterArr;
  return (
    <ul className='container__list'>
      {whichOne.map((e: stateInputT) => {
        return (
          <li key={e.id} className='list__item'>
            <span className='item item_info'>{e.textValue}</span>
            <span className='item item__price'>{e.numberValue}</span>
            <button
              type='button'
              className='item item__btn'
              onClick={() => {
                dispatch({
                  type: SET_EDIT,
                  payload: e,
                });
              }}
            >
              Редактировать
            </button>
            <button
              type='button'
              className='item item__btn btn-close'
              onClick={() => dispatch({ type: SET_DELETE, payload: e })}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
}
