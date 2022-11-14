import React, { useEffect, useState } from 'react'
import { PruebaContext, Usuario } from './PruebaContext'

interface Props {
    //! la prop children va a recibir JSX ELEMENTS o una lista de JSX Elements[]
    children: JSX.Element|JSX.Element[]
}
export const ContextProvider = ({children}:Props) => {
    
    const User={nombre:"Jota Collantes", proyecto:"J2Systems",username:"@jotajota18",islogged:true}

  
    
  //let datosPersistentes:any=localStorage.getItem("usuarios")||''
  
  
const [usuario,setUsuario] = useState({}) 

  useEffect(() => {
    //Se va a ejecutar cada vez que se actualiza la dependencia usuario que es un estado
    let datosPersistentes=JSON.parse(localStorage.getItem("usuario")||'')
    console.log("Local Storage",datosPersistentes)
    console.log(datosPersistentes.islogged,datosPersistentes.nombre)  
    setUsuario(User)
    console.log("Datos Persistentes",datosPersistentes)  
    console.log('estado: ',usuario)
 
    
}, [])
    

  
   
  


    useEffect(() => {
        //Se va a ejecutar cada vez que se actualiza la dependencia usuario que es un estado
        localStorage.setItem("usuario",JSON.stringify(usuario))
        console.log("se actualizo LS")
     }, [usuario])
    
 
      return (
        //!esto es un Higher order components y proporcionamos el estado al provider que proporcionara el estado a cualquier hijo que este
        <PruebaContext.Provider value={{usuario,setUsuario}}>
        {/* Incluimos el componenter que tiene la congiruacion del router */}
      {children}
      </PruebaContext.Provider>
      )
    }