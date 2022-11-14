import React from 'react'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'


export const Todo = () => {
  const {pendingTodo}=useTodos()
  return (
        <>
          <h1>Todo</h1>
            <h2>Tareas pendientes : {pendingTodo}</h2>
          <TodoList/> 
          </>)
   
   
    
   
}
