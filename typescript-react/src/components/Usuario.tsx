import React, { useState } from 'react'

export const Usuario = () => {
    interface User {
        uid: number,
        name:string
    }

const userDefault:User ={
    uid:0,
    name:''
}

//! El type que manejara el estado es de tipo User definido en la interface
const [usuario, setUsuario] = useState<User>(userDefault)

  const mostrarUsuario=():void=>{
    setUsuario({
        uid:123,
        name:"Jota Collantes"
    })
  }

  return (
    <div>
        
        <h1>Usuario</h1>
        <h2>{JSON.stringify(usuario)}</h2>
        <button
        onClick={mostrarUsuario}
        >Mostrar Usuario</button>


    </div>
  )
}
