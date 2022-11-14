import React from 'react'
import { useStrings } from '../hooks/useStrings'
// interface Props {
//   cadena:string
// }
export const TestStrings = () => {
    const {stateStrings,upperCase,lowerCase,concat,reset} =useStrings<string>('juan jose collantes')
  return (
    <div>
      <h1>TestStrings</h1>
      <h2>{stateStrings}</h2>
      <button onClick={upperCase}>To Upper</button>
      <button onClick={lowerCase}>To Lower</button>
      <button onClick={()=>{concat('programador')}}>Concatenar</button>
      <button onClick={reset}>Reset</button>

    </div>
  )
}
