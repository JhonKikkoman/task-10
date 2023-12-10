/** @format */
import { useState } from 'react';
import './App.css';
import { InputWidget } from './components/InputWidget';
import { ResultWidget } from './components/ResultWidget';
import { stateResT, stateU } from './components/models';
// import { useSelector } from 'react-redux';

function App() {
  const [state, setState] = useState<stateU[]>([]);
  const [stateRes, setStateRes] = useState<stateResT>({
    textValue: '',
    numberValue: '',
    id: '',
    boo: false,
  });
  // const items = useSelector((state: any) => state.input);
  // console.log(items);

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
      <InputWidget propClbk={inputClbk} propEditObj={stateRes} />
      <ResultWidget propArr={state} ClbkResult={resultClbk} />
    </>
  );
}

export default App;
