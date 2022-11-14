import React, { useState } from 'react'

export const MiFormularioOnSubmit = () => {

    
    const [cursoState, setCursoState] = useState({})
        const guardar=(e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        //const {titulo,anio,descripcion,autor,email}= e.target
        //console.log((e.currentTarget.elements[0] as HTMLInputElement).value)
        let curso={}
        let name:string
        let value:string
        for (const elemento of e.currentTarget.elements) {
            name=(elemento as HTMLInputElement).name
            if (name=="boton") 
            {
                break;
            } 
        
            value=(elemento as HTMLInputElement).value
            curso={...curso,
            [name]:value
            }
        }
         setCursoState(curso)
    }
  return (
    <div>
        <h1>Formulario con Submit</h1>
        <p>Formulario para guardar curso</p>
        <p>Curso Guardado</p>
        <pre>{JSON.stringify(cursoState)}</pre>

            <form onSubmit={guardar} className="mi-formulario">
                <input type="text" name="titulo" placeholder='Titulo'/>
                <input type="number" name="anio" placeholder='Año de Publicacion'/>
                <textarea name="descripcion" placeholder='Descripcion'/>
                <input type="text" name='autor' placeholder='Autor'/>
                <input type="email" name='email' placeholder='Correo de Contacto'/>
                <input type="submit" name='boton' value="Enviar"/>

            </form>

        </div>
  )
}
