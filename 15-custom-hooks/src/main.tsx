import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import { MiFormularioOnChange } from './components/MiformularioOnChange'
import { MiFormularioOnSubmit } from './components/MiFormularioOnSubmit'
import { MiUsuario } from './components/MiUsuario'

import { TestStrings } from './components/TestStrings'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <TestStrings/> */}
    {/* <MiFormularioOnSubmit/> */}
    {/* <MiFormularioOnChange/> */}
    <MiUsuario/>
  </React.StrictMode>
)
