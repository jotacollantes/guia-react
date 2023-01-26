import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Cart, Home,Confirmation, Movie,EmptyCart} from '../pages'



export const BlockBusterRoutes = () => {
  return (
    <Routes>

      {/* Todas estas rutas son hijas de la ruta raiz / definida en la ruta padre dentro de AppRouter */}
    <Route path="/" element={<Home/>}/>
    <Route path="/movie" element={<Movie/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/confirmation" element={<Confirmation/>}/>
    <Route path="/emptycart" element={<EmptyCart/>}/>

    
    <Route path="/*"  element={<Navigate to="/"/>}/> 
    

</Routes>
  )
}
