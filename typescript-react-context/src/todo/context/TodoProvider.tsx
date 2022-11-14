import React, { useReducer } from 'react'
import { TodoState } from '../interface/interfaces'
import { TodoContext } from './TodoContext'
import { todoReducer } from './TodoReducer'

//!el INITIAL_STATE sera del tipo TodoState definido en las interfaces
const INITIAL_STATE:TodoState={
    todoCount:2,
    todos:[
        {
            id:'1',
            desc:"Recolectar las piedras del infinito",
            completed: false
        },
        {
            id:'2',
            desc:"Recolectar la piedra del alma",
            completed: false
        }

    ],
    completed:0,
    pending:2
}

interface Props {
    //! la prop children va a recibir JSX ELEMENTS o una lista de JSX Elements[]
    children: JSX.Element|JSX.Element[]
}


export const TodoProvider = ({children}:Props) => {
//* el reducer y los metodos que van a interactuar con el estado los creams y los montamos en el provider

const [todoState, dispatch] = useReducer(todoReducer,INITIAL_STATE)

const toggleTodo=(id:string)=>{
    dispatch({type:'toggleTodo',payload:{id:id}})

}
  return (
    //!esto es un Higher order components y proporcionamos el estado al provider que proporcionara el estado a cualquier hijo que este
    <TodoContext.Provider value={{todoState,toggleTodo}}> 
        {/* Aqui se van a renderizar los componentes hijos */}
        {/* Por el momento solo se monta el componente <TodoList/>  */}
        {children}
    </TodoContext.Provider>
  )
}
