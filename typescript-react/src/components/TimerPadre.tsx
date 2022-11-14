import React, { useState } from 'react'
import { Timer } from './Timer'

export const TimerPadre = () => {

    type Miliseconds=number
    const [milisegundos, setMilisegundos] = useState<Miliseconds>(1000)
    const [inicio, setInicio] = useState(false)
  return (
    <div>
       <h1> Timer Padre</h1>
       <button
       className='btn btn-ouline-success'
       onClick={()=>
        {
            setMilisegundos(1000)
            setInicio(true)
        
        }}
       >
        1000</button>
       <button
       className='btn btn-ouline-success'
       onClick={()=>
        {
            setMilisegundos(2000)
            setInicio(true)
        }}
       >
        2000</button>

         {
            //Como por defecto inicio es false no se carga el componente <Timer/>
            inicio && <Timer milisegundos={milisegundos}/>
         }
        
        </div>
  )
}
