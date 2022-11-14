import React, { useState } from 'react'
import { useForms } from '../hooks/useForms'

export const MiFormularioOnChange = () => {
    


    interface Curso {
        titulo:string,
        anio:number,
        descripcion:string,
        autor:string,
        email:string
    }
    const curso={
        titulo:'',
        anio:0,
        descripcion:'',
        autor:'',
        email:''
    }

     //!La interface Curso es opcional, typescript va a inferir el tipo de dato segun el valor en el objeto de initState
    const {anio,descripcion,autor,email,titulo,handlerChange,cursoState}=useForms<Curso>(curso)
  return (
    <div>
        <h1>Formulario con OnChange</h1>
        <p>Formulario para guardar curso</p>
        <p>Curso Guardado</p>
        <pre className='codigo'>{JSON.stringify(cursoState)}</pre>
        <div  id="box" className='enviado'></div>
            <form  noValidate autoComplete='off' className="mi-formulario">
                <input type="text" onChange={handlerChange} name="titulo" placeholder='Titulo' value={titulo}/>
                <input type="number" onChange={handlerChange} name="anio" placeholder='Año de Publicacion' value={anio}/>
                <textarea onChange={handlerChange} name="descripcion" placeholder='Descripcion' value={descripcion}/>
                <input type="text" onChange={handlerChange} name='autor' placeholder='Autor' value={autor}/>
                <input type="email" onChange={handlerChange} name='email' placeholder='Correo de Contacto' value={email}/>
                <input type="submit" name='boton' value="Enviar"/>

            </form>

        </div>
  )
}
