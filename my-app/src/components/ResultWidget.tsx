/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { propT, stateInputT } from './models';
import { SET_EDIT } from './store/action';

export function ResultWidget({ propArr, ClbkResult }: propT) {
  const { arrUsersValue } = useSelector((state: any) => state.input);
  const dispatch = useDispatch();

  return (
    <ul className='container__list'>
      {arrUsersValue.map((e: stateInputT) => {
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
              onClick={() => console.log('jello')}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
}
