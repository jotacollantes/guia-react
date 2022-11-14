import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext'

export const Inicio = () => {
  const {usuario,setUsuario}=useContext(PruebaContext)
  const {nombre,proyecto,username}=usuario
       
  return (
    <div>
      <h1>Inicio</h1>
    <p>Pagina de Inicio</p>
    <p>Valor que viene del contexto: <code>{nombre}-{proyecto}</code> </p> 
    <p>Valor que viene del contexto: <code>{JSON.stringify(usuario)}</code> </p>
    </div>
  )
}
