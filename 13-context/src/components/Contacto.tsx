import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext'

export const Contacto = () => {
  const {usuario,setUsuario}=useContext(PruebaContext)
  const {nombre,proyecto}=usuario
  //console.log(usuario)
       
  return (
    <div>
    <h1>Contacto</h1>
    <p>Pagina de Contacto</p>
    <p>Valor que viene del contexto: <code>{nombre}-{proyecto}</code> </p>
    <p>Valor que viene del contexto: 
      <code>{JSON.stringify(usuario)}</code>
      </p> 
    </div>
  )
}
