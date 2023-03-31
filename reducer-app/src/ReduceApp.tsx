import React, { useReducer, useState } from "react";

interface CounterState {
  count?: number;
  countInterval?: number;
  increment?: boolean;
 
  
}

type CounterActionType =
  | { type: "INCREMENT"; payload: CounterState }
  | { type: "SET_INTERVAL"; payload: CounterState }
  | { type: "INCREASE_COUNT" }
  | { type: "DECREASE_COUNT" }
  | { type: "RESTART" };

const CounterInitialState: CounterState = {
  count: 0,
  countInterval: 0,
  increment: true,

  
};

const counterReducer = (
  state: CounterState,
  action: CounterActionType
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        increment: action.payload.increment,
      };
    case "SET_INTERVAL":
      return {
        ...state,
        countInterval: action.payload.countInterval,
        
      };
    case "INCREASE_COUNT":
      //console.log('entra inc')
      return {
        ...state,
        count: state.count! + state.countInterval!,
      };
    case "DECREASE_COUNT":
      //console.log('entra dec')
      return {
        ...state,
        count: state.count! - state.countInterval!,
      };
      case "RESTART":
        return CounterInitialState
    default:
      return state;
  }
};

export const ReduceApp = () => {
  //const [state, dispatch] = useReducer(()=>{}, {})
  const [state, dispatch] = useReducer(counterReducer, CounterInitialState);

  const [countInit, setCountInit] = useState<any>('')
  const handleIncrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.checked)
    const { checked } = e.target;
    dispatch({ type: "INCREMENT", payload: { increment: checked } });
  };

  const handleCountInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log('value:',value)
    // Para que cuando se de click boton incrementar y que el valor del intervalo este vacio no de cuenta:nan NAN
    let  counterValue
    counterValue= (!value)? 0 : parseInt(value)
    
    dispatch({
      type: "SET_INTERVAL",
      payload: { countInterval: counterValue },
    });
    setCountInit(value)

  };

  const handleCount = () => {
    
    if (state.increment) {
      
      dispatch({ type: "INCREASE_COUNT" });
    } else {
      dispatch({ type: "DECREASE_COUNT" });
    }
  };

  const handleRestart = () => {
    
    dispatch({ type: "RESTART" })
    setCountInit('')
    
  };
  
  return (
    <div className="padre">
      <h1>{"Hook useReducer by EWebik"}</h1>
      <p>{"Cuenta: " + state.count}</p>
      <div>
        <input
          type="checkbox"
          id="chk"
          checked={state.increment}
          onChange={handleIncrement}
        />
        <label htmlFor="chk">{"Incrementar"}</label>
      </div>
      <br />
      <div>
        <label htmlFor="interval">{"Intervalo"}</label>
        <input
          type="text"
          id="interval"
          value={countInit}
          //defaultValue={state.countInterval}
          onChange={handleCountInterval}
        />
      </div>
      <br />
      <button onClick={handleCount}>
        {state.increment ? "Incrementar" : "Decrementar"}
      </button>
      <button onClick={handleRestart}>{"Reiniciar"}</button>
    </div>
  );
};
