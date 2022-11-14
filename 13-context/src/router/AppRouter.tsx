import { useContext } from 'react'
import {Route,Routes,Link,NavLink,BrowserRouter,Navigate} from 'react-router-dom'
import { Inicio,Error, Articulos, Acerca, Contacto, Login } from '../components'
import { PruebaContext, Usuario } from '../context/PruebaContext'


export const AppRouter = () => {
    const {usuario,setUsuario} = useContext(PruebaContext)
    const {nombre,proyecto,username,islogged}=usuario
    
    
  return (
    <BrowserRouter>
    <header className='header'>
        {/* menu de navegacion */}
    <nav>
        <div className="logo">
            <h2>APrendiendo React Context</h2>
        </div>
        <ul>
            <li>
                <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
                <NavLink to="/articulos">Articulos</NavLink>
            </li>
            <li>
                <NavLink to="/acerca-de">Acerca de</NavLink>
            </li>
            <li>
                <NavLink to="/contacto">Contacto</NavLink>
            </li>
           
                 {
                 (islogged) ? 
                 
                <><li>
                 <NavLink to="/">{username}</NavLink>
                 </li>
                 <li>
                 <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    
                    setUsuario({nombre:"", proyecto:"",username:"",islogged:false})
                
                }}>Logout</a>
                 </li></>
                 
                 
                 :
                 <li>
                  <NavLink to="/login">Identificate</NavLink>
                  </li>
                } 
               
           
        </ul>
    </nav> 
    </header>
   
<section className='content'>
    {/* configuracion de rutas */}
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/articulos" element={<Articulos/>}/>
        <Route path="/acerca-de" element={<Acerca/>}/>
        <Route path="/contacto" element={<Contacto/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<Error/>}/>

    </Routes>
</section>
    

    {/* Footer */}
    </BrowserRouter>


  )
}
