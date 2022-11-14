import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodos=()=>{
      //* gracias a que le defini un type al <TodoContextProps>CreateContext dentro de  TodoContext puedo usar a todoState dentro de la desestructuracion
    const {todoState,toggleTodo} = useContext(TodoContext)
    const {todos}=todoState //Obtengo solo los Todos
    return{
        todoState,
        todos:todos,
        pendingTodo :todos.filter((todo)=>(!todo.completed)).length,
        toggleTodo
        }
}