import React from 'react'
import {BrowserRouter,Routes,Route,NavLink,Link,Navigate} from 'react-router-dom'
import { Footer } from '../components/layouts/Footer'
import { Header } from '../components/layouts/Header'
import { Nav } from '../components/layouts/Nav'
import { Sidebar } from '../components/layouts/Sidebar'
import { Articulo, Articulos, Busqueda, Crear, Editar, Inicio } from '../components/pages'
import { CrearFormik } from '../components/pages/CrearFormik'


export const Rutas= () => {
  return (

    <BrowserRouter>
        {/* Layout - Header */}
        <Header/>

        {/* Barra de Navegacion */}
        <Nav/>
     
        {/* Contenido central y rutas */}
       <section id="content" className='content'>
        <Routes>
            <Route path='/' element={<Inicio/>}/> 
            <Route path='/inicio' element={<Inicio/>}/> 
            <Route path='/articulo/:id' element={<Articulo/>}/>
            <Route path='/editar/:id' element={<Editar/>}/>
            <Route path='/articulos' element={<Articulos/>}/>
            <Route path='/crear-articulos' element={<CrearFormik/>}/> 
            <Route path='/buscar/:busqueda' element={<Busqueda/>}/> 
            {/* <Route path='/*' element={<Inicio/>}/>  */}
            <Route path='/*' element={<div className="jumbo"><h1>Error 404</h1></div>}/> 

        </Routes>
        </section>
        {/* Barra Lateral */}
        <Sidebar/>
        {/* Footer */}
        <Footer/>
       

    </BrowserRouter>
    
  )
}