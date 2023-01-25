import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home} from '../pages'

export const BlockBusterRoutes = () => {
  return (
    <Routes>

      {/* Todas estas rutas son hijas de la ruta raiz / definida en la ruta padre dentro de AppRouter */}
    <Route path="/" element={<Home/>}/>
    <Route path="/*"  element={<Navigate to="/"/>}/>
    

</Routes>
  )
}