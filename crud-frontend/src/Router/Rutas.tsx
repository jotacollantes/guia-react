import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Empleados } from '../components/pages/Empleados'
import { Nav } from '../components/layouts/Nav'
import { Login } from '../components/pages/Login'
import { Registro } from '../components/pages/Registro'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

export const Rutas = () => {
  
  return (
   <>
   {/* header y navegacion */}
        <Nav/>
        {/* Contenido Central */}
        <section >
          <Routes>


          

            <Route path='/' element={
            <PublicRoutes>
              <Login/>
            </PublicRoutes>
            }/> 

            <Route path='/login' element={
            <PublicRoutes>
              <Login/>
            </PublicRoutes>
            }/> 
            {/* <Route path='/' element={<Login/>}/>  */}
            
            <Route path='/registro' element={
            <PublicRoutes>
              <Registro/>
            </PublicRoutes>}
            />
            
            {/* <Route path='/registro' element={<Registro/>} /> */}
            
            <Route path='/empleados' element={
            <PrivateRoutes>
              <Empleados/>
            </PrivateRoutes>} />
            
            {/* <Route path='/empleados' element={<Empleados/>} /> */}
             
            {/* <Route path="/*" element={<Navigate to="/inicio"/>}/> */}
            <Route path="/*" element={
           <div ><h1 className='heading'>Error 404</h1></div>
            }/>
        </Routes>
        </section>

        
        {/* Footer */}
       
        {/* <Footer/> */}
        </>
        )
}
