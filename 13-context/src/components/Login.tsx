import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext'

export const Login = () => {


   const {usuario,setUsuario} = useContext(PruebaContext)
   
  const guardarDatos=(e:any )=> {
    e.preventDefault();
    //alert(e.target.username.value)
    const {username,nombre,proyecto}=e.target
    const usuario=
    {
    nombre: nombre.value, 
    proyecto: proyecto.value,
    username: username.value,
    islogged:true
   }
   //console.log(usuario)
   setUsuario(usuario)
  }
  return (
    <div>
      <h1>Login</h1>
    <p>Pagina de Login</p>
    <form className='login' onSubmit={guardarDatos}>

      <input type="text" name="username" placeholder='User'/>
      <input type="text" name="nombre" placeholder='Nombre'/>
      <input type="text" name="proyecto" placeholder='Web'/>
      <input type="submit" value="enviar"/>
    </form>
    </div>
  )
}
