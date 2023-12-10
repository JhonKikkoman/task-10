/** @format */

import { useEffect, useState } from 'react';
import { propInputT, stateInputT, targetT } from './models';
import { useSelector, useDispatch, connect } from 'react-redux';
import { SET_USER_INPUT } from './store/action';

export function InputWidget({ propClbk, propEditObj }: propInputT) {
  const [state, setState] = useState<stateInputT>({
    textValue: '',
    numberValue: '',
    id: '',
  });
  const dispatch = useDispatch();
  const { textValue, numberValue, id } = useSelector(
    (state: any) => state.input
  );
  useEffect(() => {
    if (propEditObj !== undefined) {
      setState(propEditObj);
    }
    return () => {
      setState({
        textValue: '',
        numberValue: '',
        id: '',
      });
    };
  }, [propEditObj]);

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    if (Number.isNaN(parseInt(state.numberValue))) {
      throw new Error(`Ошибка: ${state.numberValue} не является числом`);
    }
    dispatch({
      type: SET_USER_INPUT,
      payload: { state },
    });
    propClbk(state);
    setState({
      textValue: '',
      numberValue: '',
      id: '',
    });
    propEditObj.boo = false;
  };

  const handlerChange = ({ target }: targetT) => {
    const { name, value } = target;
    const textField = name === 'text_field' ? value : state.textValue;
    const numberField = name === 'number_field' ? value : state.numberValue;
    setState({
      textValue: textField,
      numberValue: numberField,
      id: `${textField}_${numberField}`,
    });
  };

  const handlerCancel = () => {
    propEditObj.boo = false;
    propClbk(propEditObj);
    setState({
      textValue: '',
      numberValue: '',
      id: '',
    });
  };

  return (
    <form className='container__form' onSubmit={handlerSubmit}>
      <input
        type='text'
        name='text_field'
        value={state.textValue}
        className='btn item__text-field'
        onChange={handlerChange}
      />
      <input
        type='text'
        name='number_field'
        value={state.numberValue}
        className='btn item__number-field'
        onChange={handlerChange}
      />
      <button type='submit' className='btn item__submit-btn'>
        Save
      </button>
      {propEditObj?.boo && (
        <>
          <button type='button' className='btn' onClick={() => handlerCancel()}>
            Cancel
          </button>
        </>
      )}
    </form>
  );
}
