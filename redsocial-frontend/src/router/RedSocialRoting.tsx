
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Feed } from '../components/publication/Feed'
import { Settings, People } from '../components/user'
import { Login } from '../components/user/Login'


import { Register } from '../components/user/Register'


export const RedSocialRoting = () => {
  return (
    
    <Routes>
    {/* Grupo de rutas para la pagina publica */}
    <Route path="/" element={<PublicLayout/>} >
        <Route index  element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Register/>} />
    </Route>
    

        {/* Grupo de rutas para las paginas privadas */}
    <Route path="/social" element={<PrivateLayout/>} >
      <Route index  element={<Feed/>} />
      <Route path="feed"  element={<Feed/>} />
      <Route path="people"  element={<People/>} />
      <Route path="settings"  element={<Settings/>} />
    </Route>
    
    
    
    <Route path="/*" element={<Navigate to="/"/>} />
  </Routes>
    
    
  )
}
