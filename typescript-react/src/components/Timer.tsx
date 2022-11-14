import React, { useEffect, useRef, useState } from 'react'

interface Props {
    milisegundos:number
}
export const Timer = ({milisegundos}:Props) => {
    const [segundos, setSegundos] = useState(0)
    //!useRef va a manejar un dato de tipo number que es lo que retorna el setInterval
    const ref =useRef<number>()
    useEffect(() => {
        //!SI existe el ref.current limpia el intervalo
        ref.current && clearInterval(ref.current)
        
        //!setInterval devuelve un number por lo tanto hay que decirle al useRef que se le va asignar un valor de tipo <number>

        //!setInterval ejecuta una funcion cada cierto tiempo en este caso 1000 milisegundos
     ref.current=setInterval(()=>setSegundos((s) => s+1),milisegundos)
    }, [milisegundos])
    

  return (
    <div>Timer: <code>{segundos}</code></div>
  )
}
