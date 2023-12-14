/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initT } from './models';
import { SET_FILTER } from './store/action';

export function FilterWidget() {
  const [state, setState] = useState('');

  const dispatch = useDispatch();
  const { arrUsersValue, filterInputValue } = useSelector(
    (state: { input: initT }) => state.input
  );

  const handlerChange = ({ target }: any) => {
    const { value } = target;
    // setState(value);
    const filter = arrUsersValue.filter((item) => {
      if (
        item.textValue
          .toLowerCase()
          .trim()
          .includes(filterInputValue.toLowerCase().trim())
      ) {
        return item;
      }
    });

    dispatch({
      type: SET_FILTER,
      payload: {
        filter: filter,
        str: value,
      },
    });
  };
  return (
    <div className='container__filter'>
      <input
        type='text'
        name='filter__field'
        onChange={handlerChange}
        value={filterInputValue}
        placeholder='Фильтровать по:'
        className='btn filter_input'
      />
    </div>
  );
}
