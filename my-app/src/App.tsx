/** @format */
import { useState } from 'react';
import './App.css';
import { InputWidget } from './components/InputWidget';
import { ResultWidget } from './components/ResultWidget';
import { stateResT, stateU } from './components/models';
import { FilterWidget } from './components/FilterWidget';

function App() {
  const [state, setState] = useState<stateU[]>([]);
  const [stateRes, setStateRes] = useState<stateResT>({
    textValue: '',
    numberValue: '',
    id: '',
    boo: false,
  });

  const inputClbk = (obj: stateU): void => {
    obj.numberValue = Number(obj.numberValue);
    setState((prev) => [...prev, obj]);
  };

  const resultClbk = (obj: any) => {
    const filterArr = state.filter((e) => e.id !== obj.id);
    setState(filterArr);
    obj.numberValue = String(obj.numberValue);
    obj.boo = true;
    setStateRes((prev) => {
      return { ...prev, ...obj };
    });
  };
  return (
    <>
      <div className='content_container'>
        <InputWidget propClbk={inputClbk} propEditObj={stateRes} />
        <FilterWidget />
        <ResultWidget propArr={state} ClbkResult={resultClbk} />
      </div>
    </>
  );
}

export default App;
