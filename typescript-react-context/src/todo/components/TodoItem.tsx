// import { useContext } from "react"
// import { TodoContext } from "../context/TodoContext"
import { useTodos } from "../hooks/useTodos"
import { Todo } from "../interface/interfaces"


interface Props{
    todo: Todo //*La propiedad todo tendra la firma o apariencia de la Interfaz Todo
}
export const TodoItem = ({todo}:Props) => {

       //*Invoco al metodo toggleTodo definida en el provides y anunciada por el contexto que esta dentro de mi custom Hook
       const {toggleTodo}=useTodos()
 
    //const decoration= todo.completed ? 'line-through' : ''    
    
  return (
    <>
     <li style={{cursor:"pointer", textDecoration: todo.completed ? 'line-through' : '' }}
     onDoubleClick={()=>(toggleTodo(todo.id))}
     >{todo.id} - {todo.desc}: <strong>{todo.completed ? 'Completado':'Pendiente'}</strong></li>
    </>
  )
}


