/** @format */

//<--------------AppTypes------------------------>
export type stateU = {
  textValue: string;
  numberValue: number | string;
  id: string;
};

export type stateResT = {
  textValue: string;
  numberValue: string;
  id: string;
  boo: boolean;
};
// <------------InputWidgetTypes------------------------->
export type targetT = {
  target: {
    name: string;
    value: string;
  };
};

export type stateInputT = {
  textValue: string;
  numberValue: string;
  id: string;
};

export type propInputT = {
  propClbk: (arg: stateInputT) => void;
  propEditObj?: stateResT;
};

// <--------------ResultWidgetTypes--------------->
export type propT = {
  propArr: stateU[];
  ClbkResult: (arg: stateU) => void;
};
