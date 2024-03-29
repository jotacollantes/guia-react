
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Followers, Following } from '../components/follow'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Feed } from '../components/publication/Feed'
import { Settings, People,Login,Profile } from '../components/user'



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
      <Route path="siguiendo/:userId"  element={<Following/>} />
      <Route path="seguidores/:userId"  element={<Followers/>} />
      <Route path="perfil/:userId"  element={<Profile/>} />
    </Route>
    
    
    
    <Route path="/*" element={<Navigate to="/"/>} />
  </Routes>
    
    
  )
}
