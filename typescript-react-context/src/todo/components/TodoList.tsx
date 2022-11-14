// import { useContext } from "react";
// import { TodoContext } from "../context/TodoContext";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem"


export const TodoList = () => {
   
    //  const {todoState} = useContext(TodoContext)
    //  const {todos}=todoState;

    //Uso mi custom Hook
    const {todoState,todos} = useTodos()
  return (
    <div>
        <h1>TodoList Component</h1>
        <code>{JSON.stringify(todoState)}</code>
        <ul>
        {
            todos.map((todo)=>(<TodoItem key={todo.id} todo={todo}/>))
        }
        </ul>
    </div>
   
  )
}
