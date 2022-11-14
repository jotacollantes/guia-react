

import './App.css'
import { TodoProvider } from './todo/context/TodoProvider'
import { Todo } from './todo/Todo'

function App() {


  return (
    <div className="App">
       //!TodoProvider es el provedor de la informacion que haya en el Context
      <TodoProvider>
        <Todo/>
      </TodoProvider>
    </div>
  )
}

export default App
