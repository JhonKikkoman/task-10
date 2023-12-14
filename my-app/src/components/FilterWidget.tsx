/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initT } from './models';
import { SET_FILTER } from './store/action';

export function FilterWidget() {
  const [state, setState] = useState('');

  const dispatch = useDispatch();
  const { filterInputValue } = useSelector(
    (state: { input: initT }) => state.input
  );

  const handlerChange = ({ target }: any) => {
    const { value } = target;
    // setState(value)
    dispatch({
      type: SET_FILTER,
      payload: {
        str: value,
      },
    });
  };
  return (
    <div className='container__filter'>
      <label htmlFor='filter__field' className='btn filter__label'>
        Filter by:
      </label>
      <input
        type='text'
        name='filter__field'
        onChange={handlerChange}
        value={filterInputValue}
        id='filter__field'
        className='btn filter_input'
      />
    </div>
  );
}
