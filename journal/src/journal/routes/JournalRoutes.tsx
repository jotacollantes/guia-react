import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes = () => {
  return (
    <Routes>

      {/* Todas estas rutas son hijas de la ruta raiz / definida en la ruta padre dentro de AppRouter */}
    <Route path="/" element={<JournalPage/>}/>
    <Route path="/*"  element={<Navigate to="/"/>}/>
    

</Routes>
  )
}
