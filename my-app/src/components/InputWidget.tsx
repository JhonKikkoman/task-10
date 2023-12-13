/** @format */

import { useEffect, useState } from 'react';
import { propInputT, stateInputT, targetT } from './models';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_INPUT_OBJ, SET_CANCEL, SET_SUBMIT } from './store/action';

export function InputWidget({ propClbk, propEditObj }: propInputT) {
  const [state, setState] = useState<stateInputT>({
    textValue: '',
    numberValue: '',
    id: '',
  });

  const dispatch = useDispatch();
  const { inputValue, isActive } = useSelector((state: any) => state.input);

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
    if (Number.isNaN(parseInt(inputValue.numberValue))) {
      throw new Error(`Ошибка: ${inputValue.numberValue} не является числом`);
    }
    dispatch({
      type: SET_SUBMIT,
      payload: {
        textValue: inputValue.textValue,
        numberValue: inputValue.numberValue,
        id: `${inputValue.textValue}_${inputValue.numberValue}`,
      },
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
    dispatch({
      type: SET_USER_INPUT_OBJ,
      payload: {
        textValue: textField,
        numberValue: numberField,
        name: name,
        id: `${textField}_${numberField}`,
      },
    });
    setState({
      textValue: textField,
      numberValue: numberField,
      id: `${textField}_${numberField}`,
    });
  };

  const handlerCancel = () => {
    dispatch({
      type: SET_CANCEL,
      // payload: {
      //   textValue: inputValue.textValue,
      //   numberValue: inputValue.numberValue,
      //   id: `${inputValue.textValue}_${inputValue.numberValue}`,
      // },
    });
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
        value={inputValue.textValue}
        className='btn item__text-field'
        onChange={handlerChange}
      />
      <input
        type='text'
        name='number_field'
        value={inputValue.numberValue}
        className='btn item__number-field'
        onChange={handlerChange}
      />
      <button type='submit' className='btn item__submit-btn'>
        Save
      </button>
      {isActive && (
        <>
          <button type='button' className='btn' onClick={() => handlerCancel()}>
            Cancel
          </button>
        </>
      )}
    </form>
  );
}
