import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Login, Register } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        {/* Todas estas rutas son hijas de la ruta raiz /auth definida en la ruta padre dentro de AppRouter */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/*"  element={<Navigate to="/auth/login"/>}/>

    </Routes>
  )
}
