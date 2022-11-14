import React, { useEffect, useReducer } from 'react'
import {JuegoReducer,StructureState,init} from '../reducers/JuegoReducer'




export const MisJuegos = () => {


//console.log('init: ',init())
const [state, dispatch] = useReducer(JuegoReducer,[],init)
console.log('estado inicial: ',state)
useEffect(() => {
  
    localStorage.setItem('juegos',JSON.stringify(state))
  }
, [state])

    
    // const enviarDatos=(e:React.FormEvent<HTMLFormElement>)=>{
    const enviarDatos=(e:any)=>{
        e.preventDefault();
        let juego={
            id: new Date().getTime(),
            titulo:e.target.titulo.value,
            descripcion:e.target.descripcion.value
            }
            dispatch({type:"crear",payload:juego})
    }
    const borrarJuego=(id:number)=> {
        dispatch({type:"borrar",payload:{id:id}})
    }

    const editar=(e:any,id:number,des:string)=>{
        console.log(e.target.value,id)
        const payload={id:id,titulo:e.target.value,descripcion:des}
        dispatch({type:"editar",payload})

    }
           return (
             <div>
                 <h1>Estos son mis videos Juegos</h1>
                 <p>Numero de video juegos: {state.length}</p>
                 <ul>
                    {
                        state.map((juego,index)=>{
                            return(
                            <li key={index}>
                                {juego.titulo}
                            &nbsp;&nbsp;
                         <input type="text" name="edit" defaultValue={juego.titulo}
                         //onBlur Cuando se pierde el Foco
                         onBlur={(e)=>{
                            return editar(e,juego.id,juego.descripcion)
                         }}
                         //onKeyPress Cuando se aplsta ENTER
                         onKeyPress={(e)=>{
                            (e.key==="Enter") && editar(e,juego.id,juego.descripcion)
                            
                         }}
                         />   
                        <button onClick={()=>borrarJuego(juego.id)}>Borrar</button>
                            </li>
                        
                            )
                        })
                    }
                 </ul>
                 <h3>Agregar Juego</h3>
                 <form onSubmit={(e)=>enviarDatos(e)}>
                     <input type="text" name="titulo" placeholder='Titulo' />
                     <textarea name="descripcion" placeholder='Descripcion'></textarea>
                     <input type="submit" value="Guardar"/>
                 </form>
         
             </div>
           )
         }






