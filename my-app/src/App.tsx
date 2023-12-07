/** @format */

import { useState } from 'react';
import './App.css';
import { InputWidget } from './components/InputWidget';
import { ResultWidget } from './components/ResultWidget';
import { stateResT, stateU } from './components/models';

function App() {
  const [state, setState] = useState<stateU[]>([]);
  const [stateRes, setStateRes] = useState<stateResT>();

  const inputClbk = (obj: stateU): void => {
    obj.numberValue = Number(obj.numberValue);
    setState((prev) => [...prev, obj]);
  };

  const resultClbk = (obj: any) => {
    const filterArr = state.filter((e) => e.id !== obj.id);
    setState(filterArr);
    obj.numberValue = String(obj.numberValue);
    obj.boo = true;
    if (obj !== undefined) {
      setStateRes(obj);
    }
  };

  return (
    <>
      <InputWidget propClbk={inputClbk} propEditObj={stateRes} />
      <ResultWidget propArr={state} ClbkResult={resultClbk} />
    </>
  );
}

export default App;
