import { Todo, TodoState } from "../interface/interfaces";


type TodoAction =
//Se define un type por cada type.action
|{type:'addTodo',payload:{id: string;desc: string;completed:boolean;}}//!aqui la propiedad payload tambien se puede definir con la interface Todo
|{type:'toggleTodo',payload:{id: string}}

//!El state sera del tipo TodoState que tiene la apariencia del INITIAL_STATE que esta definida como constante en el componente <TodoProvider>
export const todoReducer=(state:TodoState,action:TodoAction)=>
{
        switch (action.type) {
            case "addTodo":
                //*Siempre se devuelve un nuevo estado
                return {
                    //!Propago todas las propiedades del estado
                    ...state,
                    //Sobre escribo la propiedad todo, propago todos los todo que estan dentro de la lista y le sumo el nuevo todo que viene en el payload.
                    todo:[...state.todos,action.payload]

                }
                
            case "toggleTodo":
                    //*Siempre se devuelve un nuevo estado

                    return {
                        
                            ...state,
                            todos: state.todos.map(
                                //!Rompemos la referencia para crear un nuevo objeto
                            ({...todo})=>
                                {
                                   if (todo.id===action.payload.id)
                                    {
                                        todo.completed=!todo.completed
                                    }
                                    return todo;
                                })
                            }
                    
        
            default:
                return state;
                
                
                //console.log("Estado",state)
        }

        
}