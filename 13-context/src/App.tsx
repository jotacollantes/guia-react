
import { AppRouter } from './router/AppRouter'
import './App.css'

import { ContextProvider } from './context/ContextProvider'
function App() {


  return (
   
    <div >
      {/* Context Provider es el provedor de la informacion que hayu en el Context */}
      <ContextProvider >
        {/* Incluimos el componenter que tiene la congiruacion del router */}
      <AppRouter/>
      </ContextProvider>
      
    </div>
  )
}

export default App
