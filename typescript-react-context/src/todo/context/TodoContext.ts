import { createContext } from "react";
import { TodoState } from "../interface/interfaces";


//Defino el type TodoContextProps que es la firma o la apariencia que ha a tener el contexto
export type TodoContextProps={
    
    //El estado es el definido en el useReducer dentro del TodoProvider
    todoState:TodoState,//*Va a tener un estado del tipo TodoState
    //Especifico la firma del metodo toggleTodo
    toggleTodo:(id:string)=>void
}

//Creamos el Contexto y lo exportamos
//La variable TodoContex va a servir para crear el  Provider para compartir la informacion de estados, metodos, etc. entre los componentes hijos
export const TodoContext=createContext<TodoContextProps>({} as TodoContextProps)

