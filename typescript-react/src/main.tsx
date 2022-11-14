import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ContadorRed from './components/ContadorRed'
import { Formulario } from './components/Formulario'
import { Formulario2 } from './components/Formulario2'
import { TimerPadre } from './components/TimerPadre'
import { Usuario } from './components/Usuario'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Usuario />
    <TimerPadre/>
    <ContadorRed/>
    <Formulario/>
    <Formulario2/>
  </React.StrictMode>
)
