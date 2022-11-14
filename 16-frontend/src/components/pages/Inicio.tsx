import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido a mi blog en react</h1>
      <p>Blog desarrollado con el Mern Stack (Mongo,Express,React y Nodejs)</p>
      <Link to="/articulos" className='button'>Ver los Articulos</Link>


    </div>
  )
}
