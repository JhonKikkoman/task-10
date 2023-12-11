/** @format */

import { useSelector } from 'react-redux';
import { propT } from './models';

export function ResultWidget({ propArr, ClbkResult }: propT) {
  const item = useSelector((state: any) => state.input);
  console.log(item);

  return (
    <ul className='container__list'>
      {propArr.map((e) => {
        return (
          <li key={e.id} className='list__item'>
            <span className='item item_info'>{e.textValue}</span>
            <span className='item item__price'>{e.numberValue}</span>
            <button
              type='button'
              className='item item__btn'
              onClick={() => ClbkResult(e)}
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
